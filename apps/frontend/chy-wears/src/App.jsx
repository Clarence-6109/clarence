import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Shop from "./components/Shop";

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
    <div className="app">
      <Navbar user={user} cartCount={cart.length} onLogout={handleLogout} />
      <Home />
      <Shop onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
};

export default App;
