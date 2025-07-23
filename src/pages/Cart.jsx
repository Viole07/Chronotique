import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { darkMode } = useContext(ThemeContext);

  const total = cart.reduce((sum, item) => {
    const price = Number(item.acf.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  return (
    <motion.div
      className={`p-6 pt-24 min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Browse Watches
          </Link>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {cart.map((item) => {
            const price = Number(item.acf.price) || 0;
            const quantity = Number(item.quantity) || 1;
            const subtotal = price * quantity;

            return (
              <motion.div
                key={item.id}
                className={`rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md border transition ${
                  darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
                }`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{item.title.rendered}</h3>
                  <p className="text-sm">
                    ₹{price.toLocaleString()} × {quantity} ={' '}
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-16 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })}

          <div
            className={`text-right text-xl font-bold mt-6 ${
              darkMode ? 'text-white' : 'text-black'
            }`}
          >
            Total: ₹{total.toLocaleString()}
          </div>

          <div className="text-right">
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
