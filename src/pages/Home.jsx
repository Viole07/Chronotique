import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import WatchCard from '../components/WatchCard';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [watches, setWatches] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    axios
      .get('http://watchcms.local/wp-json/wp/v2/watch?_embed&acf_format=standard')
      .then((res) => setWatches(res.data))
      .catch((err) => console.error('Error fetching watches:', err));
  }, []);

  // Filter watches based on search term and category
  const filteredWatches = watches.filter((watch) => {
    const title = watch.title.rendered.toLowerCase();
    const brand = watch.acf.brand.toLowerCase();
    const categoryMatch = category === 'All' || watch.acf.category === category;
    
    return (
      (title.includes(searchTerm.toLowerCase()) || brand.includes(searchTerm.toLowerCase())) && categoryMatch
    );
  });

  return (
    <motion.div
      className={`p-6 pt-20 min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, brand..."
          className={"bg-#FFFFFF dark:bg-#000000  text-#000000 w-full sm:w-1/2 border border-gray-300  dark:text-#FFFFFF px-3 py-2 rounded shadow-sm transition"}
        />
      </div>

      {/* Category Filter */}
      <label className="block mb-4">
        <span className="text-lg font-medium mr-2">Filter by Category:</span>
        <motion.select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`bg-#FFFFFF dark:bg-#000000  text-#000000 border px-3 py-2 rounded shadow-sm  dark:text-#FFFFFF dark:border-gray-600 transition-colors duration-300`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <option>All</option>
          <option>Analog</option>
          <option>Digital</option>
          <option>Smartwatch</option>
        </motion.select>
      </label>

      {/* Watch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredWatches.length > 0 ? (
          filteredWatches.map((watch, i) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {watch ? <WatchCard watch={watch} /> : null}
            </motion.div>
          ))
        ) : (
          <p>No watches available</p>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
