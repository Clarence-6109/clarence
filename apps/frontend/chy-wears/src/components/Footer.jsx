// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-pink-400 mb-4">Chy-Wears</h3>
            <p className="text-gray-400">
              Your destination for elegant women's fashion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Dresses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Evening Wear
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for exclusive offers</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-400"
            />
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Chy-Wears. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
