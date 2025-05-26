import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGeeksforgeeks } from 'react-icons/si';
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';

import TypingEffectText from '../components/TypingEffectText';
import ParticlesBackground from '../components/ParticlesBackground';
import HomePic from '../assets/Images/HomePIc.png';

export default function Home() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = window.pageYOffset;
      setParallaxOffset(offset * 0.15);
    }, 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phrases = ["Web Developer", "MERN Stack Developer"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-16 md:py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-600 opacity-10 blur-3xl z-0"></div>
      <ParticlesBackground style={{ zIndex: 0, position: 'absolute', opacity: 0.3 }} />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        transition={{ duration: 0.8 }}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
        className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-12 z-10"
      >
        {/* Left: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-4">
          <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-semibold text-gray-800 dark:text-white">
            Hello! It's Me
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-blue-600 dark:text-blue-400">
            Manikanta
          </motion.h2>

          <motion.h3 variants={itemVariants} className="text-xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 min-h-[2.5rem] md:min-h-[3.5rem]">
            I am a <TypingEffectText phrases={phrases} />
          </motion.h3>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Bridging Creativity and Technology for Seamless User Journeys
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-start gap-5 mt-3"
          >
            <a
              href="https://www.linkedin.com/in/upputharla-manikanta/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-all transform hover:scale-110 text-blue-700 hover:text-blue-800"
            >
              <FaLinkedin className="text-3xl" />
            </a>
            <a
              href="https://github.com/Mani061212"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-all transform hover:scale-110 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300"
            >
              <FaGithub className="text-3xl" />
            </a>
            <a
              href="https://www.geeksforgeeks.org/user/21d41ajj03/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GeeksforGeeks"
              className="transition-all transform hover:scale-110 text-green-600 hover:text-green-700"
            >
              <SiGeeksforgeeks className="text-3xl" />
            </a>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all duration-300"
              >
                Hire Me
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://drive.google.com/file/d/1k9NuY45dc4R3sGObykzrSziILhMipvzw/view?usp=sharing"
                download
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all duration-300"
              >
                See My Resume
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Profile Image */}
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="relative">
            <img
              src={HomePic}
              alt="Manikanta Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300';
              }}
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full object-cover border-8 border-blue-500 shadow-2xl dark:border-blue-400 transition-all duration-300"
            />
            <div className="absolute -inset-2 rounded-full shadow-xl blur-2xl opacity-20 bg-blue-500"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
