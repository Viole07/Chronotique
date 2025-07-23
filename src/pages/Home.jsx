import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import WatchCard from '../components/WatchCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const categories = ['All', 'Analog', 'Digital', 'Smartwatch'];

const CustomDropdown = ({ category, setCategory }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-64 mb-6" ref={ref}>
      <button
        className="w-full bg-black text-white border border-gray-300 px-4 py-2 rounded shadow-sm text-left transition"
        onClick={() => setOpen(!open)}
      >
        {category}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute left-0 right-0 bg-black border border-gray-300 rounded shadow-md mt-1 z-10"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {categories.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setCategory(option);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const [watches, setWatches] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://watchcms.local/wp-json/wp/v2/watch?_embed&acf_format=standard')
      .then((res) => setWatches(res.data))
      .catch((err) => console.error('Error fetching watches:', err));
  }, []);

  const filteredWatches = watches.filter((watch) => {
    const title = watch.title.rendered.toLowerCase();
    const brand = watch.acf.brand.toLowerCase();
    const categoryMatch = category === 'All' || watch.acf.category === category;

    return (
      (title.includes(searchTerm.toLowerCase()) ||
        brand.includes(searchTerm.toLowerCase())) &&
      categoryMatch
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
          className="!bg-black !text-white w-full sm:w-1/2 border border-gray-300 px-3 py-2 rounded shadow-sm transition"
        />
      </div>

      {/* Category Filter (Animated Dropdown) */}
      <label className="block mb-2 text-lg font-medium">Filter by Category:</label>
      <CustomDropdown category={category} setCategory={setCategory} />

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
              <WatchCard watch={watch} />
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
