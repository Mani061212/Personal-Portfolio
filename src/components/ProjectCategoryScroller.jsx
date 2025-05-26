import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard'; // Ensure ProjectCard is imported

// ProjectCategoryScroller component handles the automatic horizontal scrolling
// for a single category of projects, with continuous circular looping and consistent card sizing.
export default function ProjectCategoryScroller({ category, projects, openProjectModal, inView }) {
  const scrollContainerRef = useRef(null); // Ref for the outer scrollable div
  const contentRef = useRef(null); // Ref for the inner div containing one set of project cards
  const [isScrolling, setIsScrolling] = useState(true);
  const [singleContentWidth, setSingleContentWidth] = useState(0); // Stores the width of one full set of cards

  // Callback to measure content width, memoized for efficiency
  const measureContentWidth = useCallback(() => {
    if (contentRef.current && scrollContainerRef.current && projects.length > 0) {
      const firstCardElement = contentRef.current.querySelector('.flex-shrink-0.w-80.flex-none');

      if (!firstCardElement) {
        console.warn(`ProjectCategoryScroller: First project card element not found for category ${category}. Cannot measure width.`);
        return;
      }

      const cardWidth = firstCardElement.offsetWidth; // Get actual rendered width including padding and border
      const computedStyle = window.getComputedStyle(firstCardElement);
      const marginRight = parseFloat(computedStyle.marginRight); // Get actual margin-right from space-x-8

      // Calculate the width of one complete set of projects including all gaps
      const numCards = projects.length;
      const calculatedSingleWidth = (numCards * cardWidth) + (Math.max(0, numCards - 1) * marginRight);

      // Log for debugging: Check calculated width for each category
      console.log(`Category: ${category}, Measured Card Width: ${cardWidth}, Margin Right: ${marginRight}, Calculated Single Content Width: ${calculatedSingleWidth}`);

      // Update state only if the calculated width is significantly different and valid
      // Using a small tolerance for float comparison to avoid unnecessary re-renders
      if (calculatedSingleWidth > 0 && Math.abs(calculatedSingleWidth - singleContentWidth) > 1) {
        setSingleContentWidth(calculatedSingleWidth);
        // Initialize scroll position to the start of the *second* set of content for seamless loop
        scrollContainerRef.current.scrollLeft = calculatedSingleWidth;
      }
    }
  }, [singleContentWidth, projects, category]); // Depend on singleContentWidth, projects, and category

  // Effect 1: Run measurement on mount and resize
  useEffect(() => {
    // Add a slight delay before initial measurement to ensure all elements are rendered
    const timeoutId = setTimeout(measureContentWidth, 100);

    window.addEventListener('resize', measureContentWidth); // Re-measure on resize
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureContentWidth); // Cleanup
    };
  }, [measureContentWidth]); // Depend on memoized callback

  // Effect 2: Handle automatic horizontal scrolling using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    const scrollContainer = scrollContainerRef.current;

    const animateScroll = () => {
      if (scrollContainer && isScrolling && singleContentWidth > 0 && inView) {
        scrollContainer.scrollLeft += 1; // Scroll by 1 pixel

        // Loop logic: When the scroll position reaches the end of the *second* set of content,
        // instantly jump back to the start of the *second* set.
        if (scrollContainer.scrollLeft >= singleContentWidth * 2 - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = singleContentWidth; // Jump back to the start of the *second* set
        }
        // Handle potential backward scrolling (e.g., if user manually scrolls backwards)
        else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = singleContentWidth; // Jump to the start of the *second* set
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
  }, [isScrolling, singleContentWidth, inView]);

  // Pause scrolling on mouse enter, resume on mouse leave
  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <div key={category} className="mb-12 last:mb-0"> {/* Wrapper div for category title and scroller */}
      <motion.h3
        className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white capitalize"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {category}
      </motion.h3>
      <div
        ref={scrollContainerRef}
        className="w-full md:w-[960px] mx-auto overflow-x-auto p-4 custom-scrollbar"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={contentRef} className="flex space-x-8 px-2 min-w-max">
          {/* Render content twice for seamless looping */}
          {projects.map((project, index) => (
            <motion.div
              key={`project-1-${project.id}-${index}`} // Unique key for first set
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 flex-none" // Ensure consistent width
            >
              <ProjectCard project={project} onClick={() => openProjectModal(project)} />
            </motion.div>
          ))}
          {/* Duplicate content */}
          {projects.map((project, index) => (
            <motion.div
              key={`project-2-${project.id}-${index}`} // Unique key for second set
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 flex-none" // Ensure consistent width
            >
              <ProjectCard project={project} onClick={() => openProjectModal(project)} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
