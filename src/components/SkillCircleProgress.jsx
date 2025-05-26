import React from 'react';
import { motion } from 'framer-motion';

// SkillCircleProgress component displays a skill's percentage in a circular progress bar.
// It includes the skill icon in the center and the skill name and percentage below.
// Now accepts an onClick prop for click functionality.
export default function SkillCircleProgress({ skillName, skillIcon, percentage, delay = 0, onClick }) { // Removed onMouseEnter, onMouseLeave props
  const radius = 30; // Further decreased radius for smaller circles
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer flex-shrink-0 w-32 h-[180px]" // Added fixed height h-[180px]
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick} // Attach the onClick handler
    >
      <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0"> {/* Smaller container for SVG, flex-shrink-0 to prevent shrinking */}
        {/* SVG for the circular progress bar */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 70 70"> {/* Adjusted viewBox */}
          {/* Background circle */}
          <circle
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="6" // Adjusted stroke width
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="35" // Adjusted cx/cy based on new viewBox
            cy="35"
          />
          {/* Progress circle */}
          <motion.circle
            className="text-blue-500"
            strokeWidth="6" // Adjusted stroke width
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="35" // Adjusted cx/cy based on new viewBox
            cy="35"
            strokeDasharray={circumference}
            strokeDashoffset={circumference} // Start from full offset (hidden)
            animate={{ strokeDashoffset: strokeDashoffset }} // Animate to calculated offset
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }} // Animate with delay
          />
        </svg>
        {/* Skill Icon in the center - now clearly visible */}
        <div className="absolute text-4xl text-gray-800 dark:text-white"> {/* Increased icon size for prominence */}
          {skillIcon}
        </div>
        {/* Percentage text is now moved below the circle */}
      </div>
      {/* Skill Name and Percentage below the circle */}
      <h4 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white text-center line-clamp-2 flex-grow"> {/* Added line-clamp-2 and flex-grow */}
        {skillName} ({percentage}%) {/* Percentage added here */}
      </h4>
    </motion.div>
  );
}
