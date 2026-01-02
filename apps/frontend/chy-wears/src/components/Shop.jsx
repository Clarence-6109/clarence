// Shop Component
const Shop = ({ onAddToCart }) => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Dresses", "Evening", "Casual"];

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div id="shop" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Our Collection
        </h2>

        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === cat
                  ? "bg-pink-600 text-white"
                  : "bg-pink-100 text-pink-600 hover:bg-pink-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
