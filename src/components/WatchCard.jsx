import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const WatchCard = ({ watch }) => {
  const { darkMode } = useContext(ThemeContext);
  const { id, title, acf, _embedded } = watch;

  const image =
    acf.product_image || _embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <motion.div
      className={`border rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 p-4 ${
        darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'
      }`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/watch/${id}`} className="no-underline">
        <img
          src={image}
          alt={title.rendered}
          className="w-full h-48 object-contain mb-4 rounded-md"
        />
        <h3 className="font-semibold text-lg mb-2">{title.rendered}</h3>
      </Link>
      <p><strong>Brand:</strong> {acf.brand}</p>
      <p><strong>Category:</strong> {acf.category}</p>
      <p><strong>Price:</strong> ₹{acf.price}</p>
      <p><strong>Rating:</strong> ⭐ {acf.rating}</p>
    </motion.div>
  );
};

export default WatchCard;
