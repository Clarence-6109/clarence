import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Products.css";
const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    category: "Dresses",
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: "Elegant Silk Blouse",
    price: 65.0,
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=400&h=500&fit=crop",
    category: "Tops",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "High-Waist Palazzo Pants",
    price: 75.0,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
    category: "Bottoms",
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: "Bohemian Maxi Skirt",
    price: 55.0,
    originalPrice: 80.0,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0uj5a?w=400&h=500&fit=crop",
    category: "Bottoms",
    isNew: false,
    isSale: true,
  },
  {
    id: 5,
    name: "Classic White Blazer",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop",
    category: "Tops",
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Evening Cocktail Dress",
    price: 145.0,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop",
    category: "Dresses",
    isNew: true,
    isSale: false,
  },
  {
    id: 7,
    name: "Cozy Knit Cardigan",
    price: 58.0,
    originalPrice: 85.0,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
    category: "Tops",
    isNew: false,
    isSale: true,
  },
  {
    id: 8,
    name: "Pleated Midi Dress",
    price: 98.0,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "Dresses",
    isNew: true,
    isSale: false,
  },
];
const filters = ["All", "Dresses", "Tops", "Bottoms"];
function Products() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});
  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.category === activeFilter);
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProducts((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };
  return (
    <section className="products" id="products">
      <div className="products-container">
        <div className="section-header">
          <span className="section-badge">Trending</span>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-description">
            Discover the latest trends handpicked just for you
          </p>
        </div>
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-tab ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badges">
                  {product.isNew && (
                    <span className="badge badge-new">New</span>
                  )}
                  {product.isSale && (
                    <span className="badge badge-sale">Sale</span>
                  )}
                </div>
                <div className="product-actions">
                  <button className="action-btn wishlist-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </button>
                  <button className="action-btn quick-view-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
                <button
                  className={`add-to-cart-btn ${
                    addedProducts[product.id] ? "added" : ""
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedProducts[product.id] ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="original-price">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="products-footer">
          <button className="btn btn-secondary">View All Products</button>
        </div>
      </div>
    </section>
  );
}
export default Products;
