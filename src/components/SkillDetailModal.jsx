import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function SkillDetailModal({ isOpen, onClose, skill }) {
  if (!skill) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative border border-gray-200 dark:border-gray-700"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors text-xl p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center text-6xl mb-4 text-gray-800 dark:text-white">
                {skill.icon}
              </div>

              {/* Skill Name */}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {skill.name}
              </h2>

              {/* Proficiency */}
              {skill.percentage !== undefined && (
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  Proficiency: {skill.percentage}%
                </p>
              )}

              {/* Details */}
              <p className="text-gray-700 dark:text-gray-300 text-justify mb-6 leading-relaxed">
                {skill.details ||
                  `Details for ${skill.name} will appear here. You can describe your experience, projects, or certifications.`}
              </p>

              {/* Embedded Certificate (Image or PDF Preview) */}
              {skill.certificateLink && (
                <div className="mt-6">
                  <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Certificate
                  </h4>

                  {skill.certificateLink.endsWith('.pdf') ? (
                    <iframe
                      src={skill.certificateLink}
                      className="w-full h-[300px] border rounded-lg"
                      title="Certificate PDF"
                    />
                  ) : (
                    <img
                      src={skill.certificateLink}
                      alt={`${skill.name} Certificate`}
                      className="w-full max-h-[300px] object-contain rounded-lg shadow-md"
                    />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
