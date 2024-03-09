import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { removeFromCart, addToCart, addToCartByQuantity } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import CartProduct from "./components/cart-product";
import { useEffect } from "react";

const Navbar = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.totalItems);
    const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
    const cartList = useSelector((state) => state.cart.productList);

    useEffect(() => {
        const localStorageCart = cartList.map((item) => {
            return {
                productId: item.productId,
                quantity: item.quantity
            }
        })
        console.log(localStorageCart);
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
    }, [cartList])

    const handleOnQuantityChange = (ev, productId) => {
        const tempQuantity = ev.target.value;
        console.log(typeof(tempQuantity));
        if (tempQuantity === null || tempQuantity === undefined || parseInt(tempQuantity) === 0 || tempQuantity === "") {
            dispatch(removeFromCart({productId: productId}))
            return;
        }

        dispatch(addToCartByQuantity({
            productId: productId,
            quantity: parseInt(tempQuantity)
        }))
    }

    const handleMinusQuantity = (productId) => {
        dispatch(removeFromCart({productId: productId}))
    }

    const handlePlusQuantity = (productId) => {
        dispatch(addToCart({productId: productId}))
    }

  return (
    <nav className="navbar">
        <h1 className="navbar_title">IERG Shop</h1>
        <div className="navbar_cart">
            <button className="navbar_cart_iconButton">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span>
                    {cartItems}
                </span>
            </button>
            <section className="navbar_cart_hoverSection">
                <div className="navbar_cart_list">
                    {cartList.map((item) => {
                        const {productId, name, price, quantity, img} = item;
                        return (
                            <CartProduct
                                key={productId}
                                productId={productId}
                                name={name}
                                price={price}
                                quantity={quantity}
                                img={img}
                                handleOnQuantityChange={handleOnQuantityChange}
                                handleMinusQuantity={handleMinusQuantity}
                                handlePlusQuantity={handlePlusQuantity}
                            />
                        )
                    })}
                </div>
                <div className="navbar_cart_total_checkout">
                    <p>Total: ${cartTotalPrice}</p>
                    <Link to={'/checkout'}>
                        <button className="navbar_checkoutButton">
                            checkout
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    </nav>
  )
}

export default Navbar