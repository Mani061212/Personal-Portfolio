import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// TypingEffectText component displays text with a typing and deleting animation.
// It cycles through an array of phrases.
export default function TypingEffectText({ phrases }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Initial typing speed

  useEffect(() => {
    const handleTyping = () => {
      const fullText = phrases[currentPhraseIndex];
      // Determine whether to type or delete
      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1) // Delete character
          : fullText.substring(0, currentText.length + 1) // Type character
      );

      // Adjust typing speed based on whether it's typing or deleting
      setTypingSpeed(isDeleting ? 75 : 150);

      // If finished typing a phrase
      if (!isDeleting && currentText === fullText) {
        setTypingSpeed(1000); // Pause at the end of typing
        setIsDeleting(true); // Start deleting
      }
      // If finished deleting a phrase
      else if (isDeleting && currentText === '') {
        setIsDeleting(false); // Stop deleting, start typing next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length); // Move to next phrase
        setTypingSpeed(150); // Reset typing speed for typing the new phrase
      }
    };

    // Set timeout for the next character
    const timeout = setTimeout(handleTyping, typingSpeed);

    // Cleanup function to clear timeout on component unmount or re-render
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <motion.span // Changed from h1 to span to allow wrapping within another h1 in Home.js
      className="text-blue-600" // Keep color here
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentText}
      {/* Blinking cursor effect */}
      <span className="inline-block animate-blink">|</span>
    </motion.span>
  );
}
