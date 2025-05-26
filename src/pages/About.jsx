import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AboutMeModal from '../components/AboutMeModal';
import ParticlesBackground from '../components/ParticlesBackground';
import AboutPic from '../assets/Images/AboutPic.jpg';

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      id="about"
      className="pt-24 pb-16 px-8 min-h-screen flex items-center relative overflow-hidden bg-white dark:bg-gray-800"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#9333ea] opacity-10 blur-3xl z-0"></div>

      <ParticlesBackground />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center z-10">
        {/* Left Side: Photo Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center p-4 md:p-0"
        >
          <motion.img
            src={AboutPic}
            alt="Your Profile"
            className="w-48 h-64 sm:w-56 sm:h-72 md:w-60 md:h-80 lg:w-64 lg:h-80 object-cover rounded-lg shadow-xl border-4 border-blue-400 dark:border-blue-600
                       transform rotate-3 scale-105 transition-transform duration-500 ease-in-out
                       [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = AboutPic;
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Right Side: Text Content */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left md:max-w-full"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-3 text-gray-900 dark:text-white"
          >
            About <span className="text-blue-600">Me</span>
          </motion.h2>

          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3"
          >
            Software Developer
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 dark:text-gray-300 mb-5 leading-relaxed text-justify"
          >
            Hi, I'm Upputharla Manikanta, a passionate MERN stack developer crafting innovative web applications with Java, MongoDB, Express.js, React, and Node.js. From building a blockchain-based SafeGuard platform to creating seamless e-commerce and weather API solutions, I thrive on turning ideas into reality. Ranked 8th on GeeksforGeeks and a Sankalp Coding Competition winner, I’m driven to push boundaries and deliver impact. Let’s create something extraordinary together!
          </motion.p>

          <motion.button
            variants={itemVariants}
            onClick={openModal}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.07, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            Read More
          </motion.button>
        </motion.div>
      </div>

      {/* About Me Detail Modal */}
      <AboutMeModal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">More About Me</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
          Hello! I'm Upputharla Manikanta, an aspiring Software Development Engineer and passionate MERN stack developer dedicated to building robust, user-centric web applications. With expertise in MongoDB, Express.js, React, Node.js, and Java, I specialize in creating scalable, innovative solutions that drive impact.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
          Currently pursuing a B.Tech in Computer Science at Sri Indu College of Engineering and Technology (CGPA: 7.5), I’ve honed my skills in Data Structures, Algorithms, and MERN stack technologies. My projects include SafeGuard, a blockchain-based secure data-sharing platform handling 1,000+ transactions, an E-commerce Platform with secure payment integration, and a Weather API Platform delivering real-time forecasts using Node.js and REST APIs.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          Ranked 8th among 1,147 students on GeeksforGeeks with 122 DSA problems solved and a winner of the Sankalp Coding Competition, I’m driven by innovation and collaboration. When not coding, I’m exploring tech trends or contributing to open-source projects. Let’s connect to bring your vision to life!
        </p>
      </AboutMeModal>
    </section>
  );
}
