import { Link, Outlet, useParams } from 'react-router-dom'
import './index.css'
import CategoryList from './components/categoryList/CategoryList'
import Navbar from './components/navbar/Navbar'
// import ProductList from './data/ProductList'

const Layout = () => {
    const { productId } = useParams()
    return (
        <div className='layout'>
            <Navbar />
            <div className='navigation_order'>
                <Link to={'/'} className='navigation_order_link'>
                    Home
                </Link>
                {productId && (
                    <div className='navigation_order_sub'>
                        <span>{' > '}</span>
                        <Link to={`/product/${productId}`} className='navigation_order_link'>Product {productId}</Link>
                    </div>
                )}
            </div>
            <section className='layout_section'>
                <div className='layout_section_catagoryList'>
                    <CategoryList />
                </div>
                <div className='layout_section_content'>
                    <Outlet />
                </div>
            </section>
        </div>
    )
}

export default Layout

        {/* 
          missing:
            3-display error of total price in shopping cart ****
            4-product detail page add cart function
            5- xx>yy>zz
        */}