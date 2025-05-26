import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Using lucide-react for the close icon

export default function AboutMeModal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Don't render if not open

  // Variants for modal animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Variants for overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Close modal when clicking outside
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-200 dark:border-gray-700"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors text-2xl p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="prose dark:prose-invert max-w-none"> {/* Use prose for better text readability */}
              {/* Ensure children passed to modal also respect text-justify if they are paragraphs */}
              {/* Applying text-justify to direct paragraphs within the modal content */}
              {React.Children.map(children, child => {
                if (React.isValidElement(child) && (child.type === 'p' || child.type === 'h3')) {
                  // Clone the paragraph and add text-justify class
                  return React.cloneElement(child, {
                    className: `${child.props.className || ''} text-justify`
                  });
                }
                return child;
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
