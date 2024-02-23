import { Route, Routes } from "react-router"
import Main from "./pages/main/Main"
import Product from "./pages/product/Product"
import Checkout from "./pages/checkout/Checkout"
import Layout from "./Layout"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/fruits" element={<Main />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App