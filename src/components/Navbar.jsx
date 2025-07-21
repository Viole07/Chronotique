import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [navOpen, setNavOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed w-full top-0 left-0 transition-transform duration-300 ${
        scrollingDown ? '-translate-y-full' : 'translate-y-0'
      } ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Chronotique</h1>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/" className="text-lg hover:underline">Home</Link>
          <Link to="/about" className="text-lg hover:underline">About</Link>
          <Link to="/contact" className="text-lg hover:underline">Contact</Link>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded transition-all duration-300"
          >
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="text-2xl"
          >
            ☰
          </button>

          {/* Mobile Menu */}
          {navOpen && (
            <div className="absolute bg-white dark:bg-black p-4 shadow-md rounded-lg right-0 mt-2">
              <Link to="/" className="block p-2 text-gray-800 dark:text-white">Home</Link>
              <Link to="/about" className="block p-2 text-gray-800 dark:text-white">About</Link>
              <Link to="/contact" className="block p-2 text-gray-800 dark:text-white">Contact</Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mt-2"
              >
                {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
