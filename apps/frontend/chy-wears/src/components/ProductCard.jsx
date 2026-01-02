// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative h-80 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-pink-50 transition">
          <Heart className="w-5 h-5 text-pink-600" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-sm text-pink-600 font-semibold mb-2">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-pink-600">
            ${product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
