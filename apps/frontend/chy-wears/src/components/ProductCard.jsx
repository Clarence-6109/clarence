import { Heart } from "lucide-react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <button className="wishlist-button">
          <Heart size={20} />
        </button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
