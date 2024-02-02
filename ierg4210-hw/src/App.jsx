import { Route, Routes } from "react-router"
import Main from "./pages/main/Main"
import Product from "./pages/product/Product"

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/product/:productId" element={<Product />} />
    </Routes>
  )
}

export default App