import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addToCart } from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ name, price, productId, img }) => {

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ name, price, productId, img }));
  };

  return (
    <div className="product_card">
      <Link to={`/product/${productId}`} className="product_card_thumbnailLink">
        <img src={img} className="product_card_img" alt="thumbnail" />
      </Link>
      <div className="product_card_description">
        <Link to={`/product/${productId}`}>
          <h4 className="product_card_title">{name}</h4>
        </Link>
        <p className="product_card_price">${price}</p>
      </div>
      <button onClick={handleAddToCart} className="product_card_addCart">
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  };

export default ProductCard;
