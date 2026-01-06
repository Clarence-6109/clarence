import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import Products from "./components/Products";
import { CartProvider } from "./context/CartContext";
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <CartProvider>
      <div className="app">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main>
          <Hero />
          <Categories />
          <Products />
          <Newsletter />
        </main>
        <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}
export default App;
