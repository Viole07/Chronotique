import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WatchDetail from './pages/WatchDetail';
import ThemeProvider from './context/ThemeContext';
import { ThemeContext } from './context/ThemeContext';

const AppWrapper = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<WatchDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppWrapper />
  </ThemeProvider>
);

export default App;
