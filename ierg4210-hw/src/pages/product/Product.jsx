import { useParams } from "react-router-dom"
import ProductList from "../../data/ProductList"
import { useEffect } from "react"

const Product = () => {
    const { productId } = useParams()

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImg, setProductImg] = useState('')
    // const [productDescription, setProductDescription] = useState('')
    // const [productCategory, setProductCategory] = useState('')
    // const [productStock, setProductStock] = useState('')
    const [addCartNumber, setAddCartNumber] = useState(1)


    useEffect(() => {
        const product = ProductList.find((product) => {
            return product.productId === productId
        })
        setProductName(product.name)
        setProductPrice(product.price)
        setProductImg(product.img)
    }, [productId])

  return (
    <div>
        <div className="productDetail_container">
            <div className="productDetail_img">
                <img src={productImg} alt="product" />
            </div>
            <div className="productDetail_info">
                <h1>{productName}</h1>
                <p>${productPrice}</p>
                <div className="productDetail_addCart">
                    <button onClick={() => setAddCartNumber(addCartNumber - 1)}>-</button>
                    <p>{addCartNumber}</p>
                    <button onClick={() => setAddCartNumber(addCartNumber + 1)}>+</button>
                </div>
                <button>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Product