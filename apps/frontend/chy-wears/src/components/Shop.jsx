import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import "./Shop.css";

const Shop = ({ onAddToCart }) => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Dresses", "Evening", "Casual"];

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div id="shop" className="shop-container">
      <div className="shop-content">
        <h2 className="shop-title">Our Collection</h2>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-button ${filter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
