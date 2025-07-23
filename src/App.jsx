// App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WatchDetail from './pages/WatchDetail';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Cart from './pages/Cart'; // ✅ Add this line

const AppWrapper = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<WatchDetail />} />
          <Route path="/cart" element={<Cart />} /> {/* ✅ Add this route */}
        </Routes>
      </Router>
    </div>
  );
};

export default AppWrapper;
