// Navbar Component
const Navbar = ({ user, cartCount, onLogout }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-pink-600">Chy-Wears</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Home
            </a>
            <a
              href="#shop"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Shop
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-pink-50 rounded-full transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-pink-50 rounded-full transition">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-pink-50 rounded-full transition relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="hidden md:block p-2 hover:bg-pink-50 rounded-full transition"
              onClick={onLogout}
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-gray-700 hover:text-pink-600">
              Home
            </a>
            <a href="#shop" className="block text-gray-700 hover:text-pink-600">
              Shop
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-pink-600"
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-pink-600"
            >
              Contact
            </a>
            <button
              onClick={onLogout}
              className="block w-full text-left text-gray-700 hover:text-pink-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
