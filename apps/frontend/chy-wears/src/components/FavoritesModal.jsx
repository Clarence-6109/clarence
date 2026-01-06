import { Heart, X } from "lucide-react";

const FavoritesModal = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.7)",
        zIndex: 2000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "100px 20px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          maxWidth: "900px",
          width: "100%",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}
          >
            My Favorites ({favorites.length})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "10px",
            }}
          >
            <X size={30} color="#374151" />
          </button>
        </div>

        {favorites.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <Heart size={80} color="#fbcfe8" style={{ marginBottom: "20px" }} />
            <p style={{ fontSize: "1.2rem", color: "#6b7280" }}>
              No favorites yet. Start adding products you love!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {favorites.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "white",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ position: "relative", height: "200px" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    onClick={() => onRemoveFavorite(product.id)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "white",
                      border: "none",
                      borderRadius: "50%",
                      padding: "8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <X size={18} color="#ec4899" />
                  </button>
                </div>
                <div style={{ padding: "15px" }}>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#ec4899",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    {product.category}
                  </p>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#ec4899",
                      marginBottom: "10px",
                    }}
                  >
                    ${product.price}
                  </p>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    style={{
                      width: "100%",
                      background: "#ec4899",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
