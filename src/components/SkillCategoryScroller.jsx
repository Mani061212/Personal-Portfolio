import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import SkillCircleProgress from './SkillCircleProgress';

// SkillCategoryScroller component displays a single category of skills
// with continuous circular horizontal scrolling and consistent card sizing.
export default function SkillCategoryScroller({ category, techStack, openSkillModal, inView }) {
  const scrollContainerRef = useRef(null); // Ref for the outer scrollable div
  const contentRef = useRef(null); // Ref for the inner div containing one set of skill cards
  const [isScrolling, setIsScrolling] = useState(true);
  const [singleContentWidth, setSingleContentWidth] = useState(0); // Stores the width of one full set of cards

  // Callback to measure content width, memoized for efficiency
  const measureContentWidth = useCallback(() => {
    if (contentRef.current && techStack.length > 0) {
      // Get the width of the first card and the space-x-6 gap
      const firstCard = contentRef.current.children[0];
      if (!firstCard) return; // Guard against empty content

      const cardWidth = firstCard.offsetWidth;
      // Tailwind's space-x-6 is 1.5rem, which is 24px by default.
      // We need to account for this margin between cards.
      const gapWidth = 24; // Assuming 1rem = 16px, 1.5rem = 24px

      // Calculate the total width of one set of cards including all gaps
      // (number of cards * card width) + (number of gaps * gap width)
      // Math.max(0, techStack.length - 1) handles the case of a single item (0 gaps)
      const calculatedWidth = (techStack.length * cardWidth) + (Math.max(0, techStack.length - 1) * gapWidth);

      // Update state only if the calculated width is significantly different and valid
      if (calculatedWidth > 0 && Math.abs(calculatedWidth - singleContentWidth) > 0.5) { // Use a small tolerance for float comparison
        setSingleContentWidth(calculatedWidth);
        // Initialize scroll position to the start of the *second* set of content for seamless loop
        // This makes the loop appear to start from the middle, giving space for the first loop
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = calculatedWidth;
        }
      }
    }
  }, [singleContentWidth, techStack]); // Depend on singleContentWidth and techStack

  // Effect 1: Run measurement on mount and resize
  useEffect(() => {
    measureContentWidth(); // Initial measurement
    window.addEventListener('resize', measureContentWidth); // Re-measure on resize
    return () => window.removeEventListener('resize', measureContentWidth); // Cleanup
  }, [measureContentWidth]); // Depend on memoized callback

  // Effect 2: Handle automatic horizontal scrolling using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    const scrollContainer = scrollContainerRef.current;

    const animateScroll = () => {
      if (scrollContainer && isScrolling && singleContentWidth > 0 && inView) {
        scrollContainer.scrollLeft += 1; // Scroll by 1 pixel

        // Loop logic: When the scroll position reaches the end of the *first* set of content,
        // instantly jump back to the start of the *first* set.
        // This creates the illusion of infinite scrolling.
        if (scrollContainer.scrollLeft >= singleContentWidth) {
          scrollContainer.scrollLeft = 0; // Jump back to the very beginning of the *first* set
        }
      }
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Start or stop scrolling based on isScrolling state, valid content width, AND parent inView status
    if (isScrolling && singleContentWidth > 0 && inView) {
      animationFrameId = requestAnimationFrame(animateScroll);
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    // Cleanup on component unmount or if dependencies change
    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling, singleContentWidth, inView]); // Added inView to dependencies

  // Pause scrolling on mouse enter, resume on mouse leave
  const handleMouseEnter = () => setIsScrolling(false); // Pause scrolling
  const handleMouseLeave = () => setIsScrolling(true); // Resume scrolling

  return (
    <div key={category} className="mb-12 last:mb-0">
      <motion.h3
        className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white capitalize"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {category}
      </motion.h3>
      {/* Horizontal scrollable container for skills */}
      <div
        ref={scrollContainerRef}
        className="w-full md:w-[608px] mx-auto overflow-x-auto p-4 custom-scrollbar" // Adjusted md:w to 608px for better visibility of 4 cards
        onMouseEnter={handleMouseEnter} // Pause scrolling on container hover
        onMouseLeave={handleMouseLeave} // Resume scrolling on container leave
      >
        {/* Inner flex container for skill cards. min-w-max ensures content doesn't wrap. */}
        <div ref={contentRef} className="flex space-x-6 min-w-max">
          {/* Render content twice for seamless looping */}
          {Array.isArray(techStack) && techStack.map((skill, index) => (
            <motion.div
              key={`skill-1-${skill.name}-${index}`} // Ensure unique keys for duplicated items
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              className="flex-shrink-0 w-32 flex-none" // Explicitly set width and flex-none for consistent card size
            >
              <SkillCircleProgress
                skillName={skill.name}
                skillIcon={skill.icon}
                percentage={skill.percentage}
                onClick={() => openSkillModal(skill)} // Open modal on click
              />
            </motion.div>
          ))}
          {Array.isArray(techStack) && techStack.map((skill, index) => (
            <motion.div
              key={`skill-2-${skill.name}-${index}`} // Ensure unique keys for duplicated items
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              className="flex-shrink-0 w-32 flex-none" // Explicitly set width and flex-none for consistent card size
            >
              <SkillCircleProgress
                skillName={skill.name}
                skillIcon={skill.icon}
                percentage={skill.percentage}
                onClick={() => openSkillModal(skill)} // Open modal on click
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
