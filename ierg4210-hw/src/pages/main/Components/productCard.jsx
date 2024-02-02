import { Link } from "react-router-dom";
import ReactIcon from "../../../assets/react.svg";
import PropTypes from "prop-types";

const ProductCard = ({ name, price, productId }) => {
  const addToCart = () => {
    console.log("add to cart");
  };

  return (
    <div className="product_card">
      <img src={ReactIcon} className="product_card_img" alt="thumbnail" />
      <div className="product_card_description">
        <Link to={`/product/${productId}`}>
          <h4 className="product_card_title">{name}</h4>
        </Link>
        <p className="product_card_price">${price}</p>
      </div>
      <button onClick={addToCart} className="product_card_addCart">
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired
  };

export default ProductCard;
