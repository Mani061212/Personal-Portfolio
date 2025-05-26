import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      className="
        bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700
        transform hover:scale-105 transition-all duration-300 ease-in-out
        hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400
        cursor-pointer
        flex flex-col h-[400px] sm:h-[420px] md:h-[450px] overflow-hidden relative
      "
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      {/* Image container with fixed aspect ratio */}
      <div
        className="w-full rounded-t-xl border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 relative"
        style={{ aspectRatio: "16 / 9" }}
      >
        <img
          src={project.images[0]}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-contain object-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x250/cccccc/333333?text=Project+Image";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 line-clamp-2">
          {project.title}
        </h3>

        {/* Description container with responsive max height */}
        <div className="relative flex-grow overflow-hidden max-h-[8rem] sm:max-h-[9.5rem]">
          <p className="text-sm sm:text-base text-gray-700 dark:text-white text-justify leading-relaxed">
            {project.description}
          </p>

          {/* Gradient fade overlay */}
          <div
            className="
              pointer-events-none
              absolute bottom-0 left-0 right-0 h-16 sm:h-20
              bg-gradient-to-t from-white dark:from-gray-800 to-transparent
            "
          />

          {/* Button absolutely positioned at bottom center */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 w-max">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="
                bg-white/30 dark:bg-gray-700/40
                backdrop-blur-md
                border border-blue-500 dark:border-blue-400
                text-blue-700 dark:text-blue-300
                font-semibold
                px-6 py-2 rounded-lg
                shadow-lg
                hover:bg-white/50 dark:hover:bg-gray-700/60
                transition
                duration-300
                select-none
                cursor-pointer
                whitespace-nowrap
              "
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
