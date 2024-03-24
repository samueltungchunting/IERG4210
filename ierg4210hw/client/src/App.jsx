import { Route, Routes } from "react-router"
import Main from "./pages/main/Main"
import Product from "./pages/product/Product"
import Checkout from "./pages/checkout/Checkout"
import Layout from "./Layout"
import axios from "axios"
import AddProduct from "./pages/add-product/AddProduct"
import ViewProduct from "./pages/view-product/ViewProduct"
// import EditViewProduct from "./pages/view-product/EditViewProduct"
// import AddCatagory from "./pages/add-catagory/AddCatagory"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {UserContextProvider} from './UserContext'
import ChangePassword from "./pages/change-password/ChangePassword"

// axios.defaults.baseURL = "https://s15.ierg4210.ie.cuhk.edu.hk:4000"
axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true


const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/" element={<Main />} />
          {/* <Route path="/fruits" element={<Main />} /> */}
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-product/:pid" element={<AddProduct />} />
          {/* <Route path="/add-catagory" element={<AddCatagory />} /> */}
          <Route path="/view-products" element={<ViewProduct />} />
          {/* <Route path="/view-products/edit/:pid" element={<EditViewProduct />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App