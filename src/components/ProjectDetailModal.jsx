import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProjectDetailModal({ isOpen, onClose, project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen && project) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, project]);

  useEffect(() => {
    let interval;
    if (isOpen && project && project.images && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % project.images.length
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-gray-200 dark:border-gray-700"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors text-2xl p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="prose dark:prose-invert max-w-none text-center">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h3>

              {project.images && project.images.length > 0 && (
                <div
                  className="relative w-full max-w-full mx-auto rounded-lg mb-6 border border-gray-300 dark:border-gray-600 shadow-lg"
                  style={{ aspectRatio: '16 / 9' }}
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={currentImageIndex}
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-contain object-center bg-gray-50 dark:bg-gray-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/800x600/cccccc/333333?text=Image+Not+Found';
                      }}
                    />
                  </AnimatePresence>
                </div>
              )}

              {/* Headings with bold, no underline */}
              <p className="mb-2 font-semibold text-gray-900 dark:text-white text-left">
                Description:
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
                {project.description}
              </p>

              <p className="mb-2 font-semibold text-gray-900 dark:text-white text-left">
                Overview:
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
                {project.overview}
              </p>

              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4 text-justify">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-4 mt-6">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline hover:no-underline inline-block bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                  >
                    View on GitHub
                  </a>
                )}
                {project.liveDemoLink && (
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline hover:no-underline inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
