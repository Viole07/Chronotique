import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useCart();
  const { darkMode } = useContext(ThemeContext);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-transform duration-300 ${
        scrollingDown ? '-translate-y-full' : 'translate-y-0'
      } ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} shadow`}
    >
      <div className="flex justify-between items-center p-4 px-6">
        {/* Chronotique Logo */}
        <Link to="/" className="text-xl font-bold hover:opacity-80 transition">
          Chronotique
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
