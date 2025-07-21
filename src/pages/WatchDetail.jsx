import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const WatchDetail = () => {
  const { darkMode } = useContext(ThemeContext);
  const { id } = useParams();
  const [watch, setWatch] = useState(null);

  useEffect(() => {
    axios
      .get(`http://watchcms.local/wp-json/wp/v2/watch/${id}?_embed&acf_format=standard`)
      .then((res) => setWatch(res.data))
      .catch((err) => console.error('Failed to fetch watch:', err));
  }, [id]);

  if (!watch) return <p className="p-6">Loading...</p>;

  const { title, content, acf, _embedded } = watch;

  const image =
    acf.product_image || _embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <motion.div
      className={`p-6 pt-20 max-w-3xl mx-auto transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ x: -15, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Link to="/" className="underline mb-4 block text-blue-500 dark:text-blue-300">← Back to Home</Link>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title.rendered}
      </motion.h1>

      <motion.img
        src={image}
        alt={title.rendered}
        className="w-[300px] h-[300px] object-contain mx-auto transition-transform duration-500 ease-in-out hover:scale-105"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      />

      <motion.div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: content.rendered }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="mb-1"><strong>Brand:</strong> {acf.brand}</p>
        <p className="mb-1"><strong>Category:</strong> {acf.category}</p>
        <p className="mb-1"><strong>Price:</strong> ₹{acf.price}</p>
        <p><strong>Rating:</strong> ⭐ {acf.rating}</p>
      </motion.div>
    </motion.div>
  );
};

export default WatchDetail;
