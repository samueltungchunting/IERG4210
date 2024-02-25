import { Route, Routes } from "react-router"
import Main from "./pages/main/Main"
import Product from "./pages/product/Product"
import Checkout from "./pages/checkout/Checkout"
import Layout from "./Layout"
import axios from "axios"
import AddProduct from "./pages/add-product/AddProduct"
import ViewProduct from "./pages/view-product/ViewProduct"
import EditViewProduct from "./pages/view-product/EditViewProduct"
import AddCatagory from "./pages/add-catagory/AddCatagory"

axios.defaults.baseURL = "http://127.0.0.1:4000"
axios.defaults.withCredentials = true


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/fruits" element={<Main />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-product/:pid" element={<AddProduct />} />
        <Route path="/add-catagory" element={<AddCatagory />} />
        <Route path="/view-products" element={<ViewProduct />} />
        <Route path="/view-products/edit/:pid" element={<EditViewProduct />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App