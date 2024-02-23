import { useParams } from "react-router-dom"
import ProductList from "../../data/ProductList"
import { useEffect, useState } from "react"
import './Product.css'
import { useDispatch } from "react-redux"
import { addToCartByQuantity } from "../../features/cart/cartSlice"

const Product = () => {
    const { productId } = useParams()

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImg, setProductImg] = useState('')
    const [productDescription, setProductDescription] = useState("")
    // const [productCategory, setProductCategory] = useState('')
    // const [productStock, setProductStock] = useState('')
    const [addCartNumber, setAddCartNumber] = useState(1)
    const [inventory, setInventory] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        const product = ProductList.find((product) => {
            return product.productId === productId
        })
        setProductName(product.name)
        setProductPrice(product.price)
        setProductImg(product.img)
        setInventory(product.stock)
        setProductDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget quam in est tincidunt aliquam. Donec et libero sed orci luctus fermentum. Nullam sit amet dui et odio tempus fermentum.")
    }, [productId])

    const handleMinusCartNumber = () => {
        if (parseInt(addCartNumber) === 1) {
            setAddCartNumber(1)
            return
        }
        setAddCartNumber(prev => parseInt(prev) - 1)
    }

    const handlePlueCartNumber = () => {
        if (parseInt(addCartNumber) === 100) {
            setAddCartNumber(100)
            return
        }
        setAddCartNumber(prev => parseInt(prev) + 1)
    }

    const handleInputCardNumber = (e) => {
        const intEvt = parseInt(e.target.value)
        if (intEvt >= 100) {
            setAddCartNumber(100)
            return
        }
        setAddCartNumber(intEvt)
    }

    const handleAddToCartByQuantity = () => {
        dispatch(addToCartByQuantity({
            productId: productId,
            name: productName,
            price: productPrice,
            img: productImg,
            quantity: addCartNumber
        }))
    }

  return (
    <div className="productDetail_layout">
        <div className="productDetail_container">
            <div className="productDetail_img">
                <img src={productImg} alt="product" />
            </div>
            <div className="productDetail_info">
                <h1>{productName}</h1>
                <p className="productDetail_info_price">${productPrice}</p>
                <p className="productDetail_info_descriptions">{productDescription}</p>
                <div className="productDetail_info_inventory">
                    {inventory <= 3 ? 
                        <p className="productDetail_info_stock_less">Only {inventory} left!</p> 
                        : 
                        <p className="productDetail_info_stock">Inventory: {inventory}</p>
                    }
                </div>
                <div className="productDetail_addCart">
                    <div className="productDetail_addCartNum">
                        <button onClick={handleMinusCartNumber} className={addCartNumber <= 1 && 'productDetail_addCartNum_disabled'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                        </button>
                        <input 
                            type="number" 
                            value={addCartNumber} 
                            onChange={handleInputCardNumber} 
                            min={1}
                            max={100}
                        />
                        <button onClick={handlePlueCartNumber} className={addCartNumber >= 100 && "productDetail_addCartNum_disabled"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                    <button onClick={handleAddToCartByQuantity}>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product