import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";

const UserActions = () => {

    const {user} = useContext(UserContext);
    // if user then show logout button with onclick post 
    // else show login button(direct user to login page)

    async function handleLogout() {
        const csrfRes = await axios.get('/auth/get_csrfToken');
        const csrfToken = csrfRes.data.csrfToken;

        const logoutRes = await axios.post('/auth/logout', { _csrf: csrfToken });
        console.log(logoutRes.data);
        window.location.reload();
    }

  return (
    <div className="bg-gray-100 shadow-md rounded-xl px-4 py-8 hidden group-hover:flex flex-col gap-3 w-48 rounded-tr-none">
        {user && user.role === 'admin' &&
            <Link to='/view-products'>
                <button className="bg-secondary py-1 px-2 rounded-lg w-full">
                    Panel
                </button>
            </Link>
        }
        {user ?
            <button 
                className="bg-red-200 py-1 px-2 rounded-lg w-full"
                onClick={handleLogout}
            >
                Logout
            </button>
            :
            <Link to='/login'>
                <button className="bg-green-100 py-1 px-2 rounded-lg w-full">
                    Login
                </button>
            </Link>
        }
        {user && 
            <Link to='/change-password'>
                <button className="bg-primary py-1 px-2 rounded-lg w-full">
                    Change Password
                </button>
            </Link>
        }
    </div>
  )
}

export default UserActions