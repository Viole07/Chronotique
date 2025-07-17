import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import WatchCard from '../components/WatchCard';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [watches, setWatches] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios
      .get('http://watchcms.local/wp-json/wp/v2/watch?_embed&acf_format=standard')
      .then((res) => setWatches(res.data))
      .catch((err) => console.error('Error fetching watches:', err));
  }, []);

  const filteredWatches =
    category === 'All'
      ? watches
      : watches.filter((w) => w.acf.category === category);

  return (
    <motion.div
      className={`p-6 min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Watch Collection</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-800 text-white dark:bg-white dark:text-black px-4 py-2 rounded transition-colors duration-300"
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <label className="block mb-4">
        <span className="text-lg font-medium mr-2">Filter by Category:</span>
        <motion.select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-1 rounded shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <option>All</option>
          <option>Analog</option>
          <option>Digital</option>
          <option>Smartwatch</option>
        </motion.select>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredWatches.map((watch, i) => (
          <motion.div
            key={watch.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <WatchCard watch={watch} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
