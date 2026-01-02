// Home Component
const Home = () => {
  return (
    <div id="home" className="bg-gradient-to-br from-pink-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Chy-Wears
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends in women's fashion. Elegant, stylish, and
            made just for you.
          </p>
          <button className="mt-8 bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition shadow-lg">
            Shop Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-pink-600 text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Quality Fabrics</h3>
            <p className="text-gray-600">
              Premium materials for ultimate comfort
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-pink-600 text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $100</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-pink-600 text-4xl mb-4">💝</div>
            <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
