import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Determine header background class based on scroll and mobile menu state
  const headerBgClass = isMobileMenuOpen
    ? 'bg-white dark:bg-gray-900 shadow-md'
    : scrolled
      ? 'backdrop-blur-lg bg-white/20 dark:bg-black/20 shadow-md'
      : 'bg-transparent';

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const menuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Project Title with styled less than and greater than signs */}
        <motion.h1
          className="text-2xl font-bold text-gray-900 dark:text-white hover:scale-105 transition-transform"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Link to="/" className="hover:text-blue-500 no-underline hover:no-underline">
            <span className="text-blue-500 font-extrabold">&lt;</span>
            Mani Prof.
            <span className="text-blue-500 font-extrabold">/&gt;</span>
          </Link>
        </motion.h1>

        {/* Desktop Navbar (Middle on desktop, hidden on mobile) */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 text-lg text-gray-800 dark:text-gray-200">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Skills', path: '/skills' },
              { name: 'Projects', path: '/projects' },
              { name: 'Contact', path: '/contact' },
            ].map((item, idx) => (
              <motion.li // Ensure motion.li is used here
                key={item.name}
                className="cursor-pointer transition-colors duration-200"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }} // whileHover is correctly on motion.li
              >
                <Link
                  to={item.path}
                  className="block hover:text-blue-500 transition-colors duration-200 no-underline hover:no-underline"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Right-aligned items: Dark Mode Toggle (always visible) and Mobile Menu Button (mobile only) */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle - always visible */}
          <motion.button // Ensure motion.button is used here
            onClick={toggleDarkMode}
            className="text-sm p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-colors"
            whileHover={{ rotate: 10 }} // whileHover is correctly on motion.button
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>

          {/* Mobile Menu Button - only visible on small screens */}
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 dark:text-white text-2xl focus:outline-none md:hidden"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 w-full shadow-lg pb-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <ul className="flex flex-col items-center space-y-2 text-lg text-gray-800 dark:text-gray-200 py-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Skills', path: '/skills' },
                { name: 'Projects', path: '/projects' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <motion.li // Ensure motion.li is used here
                  key={item.name}
                  variants={menuItemVariants}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                  whileHover={{ scale: 1.05 }} // whileHover is correctly on motion.li
                >
                  <Link
                    to={item.path}
                    className="block py-2 hover:text-blue-500 transition-colors duration-200 no-underline hover:no-underline"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
