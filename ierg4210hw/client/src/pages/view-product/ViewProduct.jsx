import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import './ViewProduct.css'
import AddIcon from '@mui/icons-material/Add';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const ViewProduct = () => {

    const [allProductList, setAllProductList] = useState([])
    const [loaded, setLoaded] = useState(false);
    const {user} = useContext(UserContext)

    useEffect(() => {
        axios.get('/product/get_all_products')
        .then((res) => {
          setAllProductList(res.data)
          setLoaded(true)
        }).catch((err) => {
          console.log(err)
          setLoaded(true)
        })
    }, [])

    if (loaded) {
        if (!user || user.role !== 'admin') {
            return <Navigate to='/' />;
        }
    }


    function handleDeleteProduct(pid, pname) {
        const confirmed = window.confirm(`Are you sure you want to delete ${pname}`)
        if(confirmed) {
            axios.delete(`/product/delete_product/${pid}`)
            setAllProductList(prev => prev.filter(product => product.pid !== pid))
        } else return;
    }

    function handleEditProduct(pid) {
        window.location.href = `/add-product?pid=${pid}`
    }

  return (
    <div className='admin_view_products_page'>
        <div className='add_product_catagory'>
            <Link to={`/add-product`}>
                <button>
                    Add Product
                    <AddIcon />
                </button>
            </Link>
        </div>
        {allProductList && allProductList.map((product) => {
            return (
                <div className='admin_view_products_card' key={product.name}>
                    <div className='admin_view_products_card_img'>
                        <img src={product.photos.length === 0 ? "https://edenshk.com/cdn/shop/products/redgrapes_900x.jpg?v=1591847193" : product.photos[0]} alt="product" />
                    </div>
                    <div className='admin_view_products_card_info'>
                        <div className='name_price'>
                            <h3>{product.name}</h3>
                            <h4>${product.price}</h4>
                        </div>
                        <p>{product.description}</p>
                    </div>

                    <div className='admin_view_btn'>
                        <div className='admin_view_action_btn admin_view_edit_btn' onClick={() => handleEditProduct(product.pid)}>
                            <span>Edit</span>
                        </div>
                        <div className='admin_view_action_btn admin_view_delete_btn' onClick={() => handleDeleteProduct(product.pid, product.name)}>
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default ViewProduct