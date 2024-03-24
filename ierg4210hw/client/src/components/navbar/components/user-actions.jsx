import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../UserContext";

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
    <div>
        <button 
            className="bg-green-300" 
            onClick={handleLogout}
        >
            Logout from {user && user.username}
        </button>
    </div>
  )
}

export default UserActions