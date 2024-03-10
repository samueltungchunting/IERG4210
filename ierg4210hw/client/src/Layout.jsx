import { Link, Outlet } from 'react-router-dom'
import './index.css'
import CategoryList from './components/categoryList/CategoryList'
import Navbar from './components/navbar/Navbar'
// import ProductList from './data/ProductList'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'



const Layout = () => {
    const [searchParams] = useSearchParams()
    const cid = searchParams.get('cid')

    let categoryName = ''; // Declare categoryName outside the if statement

    const categoryDetail = useSelector((state) =>
        state.category.categoryList.find((category) => category.cid === parseInt(cid))
    );

    if (categoryDetail) {
        categoryName = categoryDetail.name;
    }

    return (
        <div className='layout'>
            <Navbar />

            <div className='navigation_order'>
                <Link to={'/'} className='navigation_order_link'>
                    Home
                </Link>
                {cid && categoryName && (
                    <div className='navigation_order_sub'>
                        <span>{' > '}</span>
                        <span>{categoryName}</span>
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