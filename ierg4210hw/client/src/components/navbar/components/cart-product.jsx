import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {updateCartProductPrice} from "../../../features/cart/cartSlice";

// eslint-disable-next-line react/prop-types
const CartProduct = ({ productId, img, quantity, name, price, handleMinusQuantity, handleOnQuantityChange, handlePlusQuantity}) => {

    const [tempQuantity, setTempQuantity] = useState(quantity);

    const [productDetails, setProductDetails] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setTempQuantity(quantity);
        
    }, [quantity]);

    useEffect(() => {
        fetchProductDetails(productId);
    }, [productId]);

    async function fetchProductDetails(productID) {
        axios.get(`/product/get_product_detail_from_localstorage/${productID}`).then((res) => {
            setProductDetails(res.data);
            const {pid, price} = res.data;
            dispatch(updateCartProductPrice(
                {
                    productId: pid,
                    price: price
                }
            ))
        })
    }

  return (
    <div key={productId} className="navbar_cart_item">
    <div className="navbar_cart_item_thumb">
        <img src={img || productDetails?.photos[0]} alt={name} />
    </div>
    <div className="navbar_cart_item_detail">
        <h4>{name || productDetails?.name}</h4>
        <div className="navbar_cart_item_detail_num">
            <button onClick={() => handleMinusQuantity(productId)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
            </button>
            {/* <input type="number" value={quantity} onChange={() => handleOnQuantityChange(productId)}/> */}
            <input 
                type="number" 
                value={tempQuantity}
                onChange={(ev) => setTempQuantity(ev.target.value)}
                onBlur={(ev) => handleOnQuantityChange(ev, productId)}
            />
            <button onClick={() => handlePlusQuantity(productId)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
        <p className="navbar_cart_item_detail_price">${parseInt(price)*quantity || parseInt(productDetails?.price)*quantity}</p>
    </div>
</div>    
  )
}

export default CartProduct