import { Link, Outlet, useParams } from 'react-router-dom'
import './index.css'
import CategoryList from './components/categoryList/CategoryList'
import Navbar from './components/navbar/Navbar'
import ProductList from './data/ProductList'

const Layout = () => {
    const { productId } = useParams()
    return (
        <div className='layout'>
            <Navbar />
            <p className='navigation_order'>
                <Link to={'/'}>
                    Home
                </Link>
                <span>{' > '}</span>
                <Link to={'/fruits'}>
                    Fruits
                </Link>
                {productId && (
                    <>
                        <span>{' > '}</span>
                        <Link to={`/product/${productId}`}>
                            {ProductList[productId-1].name}
                        </Link>
                    </>
                )}
            </p>
            <section className='layout_section'>
                <CategoryList />
                <Outlet />
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