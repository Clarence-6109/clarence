import { useState } from "react";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Shop from "./components/Shop.jsx";
import { ShoppingCart, User, Heart, Search, Menu, X } from "lucide-react";
// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} cartCount={cart.length} onLogout={handleLogout} />
      <Home />
      <Shop onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
};

export default App;
