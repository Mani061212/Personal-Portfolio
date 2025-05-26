import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaGitAlt,
  FaJava,
  FaCode,
  FaTachometerAlt
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiTypescript, SiPython,
  SiSpring,
  SiHibernate,
  SiRedux
} from 'react-icons/si';
import SkillCategoryScroller from '../components/SkillCategoryScroller';
import SkillDetailModal from '../components/SkillDetailModal';
import ParticlesBackground from '../components/ParticlesBackground';
import TNS from '../assets/Images/TNS-C.jpg';
import Python from '../assets/Images/Python.jpg';

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = {
    frontend: [
      { name: 'React', icon: <FaReact className="text-blue-500" />, percentage: 90, details: 'Proficient in building single-page applications with React, including hooks, context API, and routing. Experienced in component-based architecture and state management for dynamic user interfaces.' },
      { name: 'Next.js', icon: <SiNextdotjs className="text-gray-800 dark:text-white" />, percentage: 80, details: 'Developed server-side rendered (SSR) and static generated (SSG) React applications with Next.js for improved performance, SEO, and efficient data fetching.' },
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" />, percentage: 95, details: 'Strong understanding of semantic HTML5 for accessible, structured, and well-organized web content.', certificateLink: TNS },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-600" />, percentage: 95, details: 'Expertise in modern CSS3 features, including Flexbox, Grid, and responsive design principles for adaptive layouts.', certificateLink: TNS },
      { name: 'JavaScript (ES6+)', icon: <FaJsSquare className="text-yellow-500" />, percentage: 95, details: 'Solid foundation in ES6+ JavaScript, asynchronous programming, and efficient DOM manipulation to create interactive web experiences.', certificateLink: TNS },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-700" />, percentage: 80, details: 'Experience with TypeScript for writing type-safe, scalable, and maintainable JavaScript codebases, reducing runtime errors.' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" />, percentage: 90, details: 'Highly skilled in rapid UI development using Tailwind CSS utility-first framework for efficient and consistent styling.' },
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-600" />, percentage: 90, details: 'Developed scalable backend APIs and microservices using Node.js and its rich ecosystem (e.g., npm, middlewares).' },
      { name: 'Express.js', icon: <SiExpress className="text-gray-800 dark:text-white" />, percentage: 85, details: 'Built robust and efficient RESTful APIs with Express.js to handle complex server-side logic and data interactions.' },
      { name: 'Java', icon: <FaJava className="text-red-500" />, percentage: 95, details: 'Proficient in Java for backend development, including object-oriented design principles and enterprise applications.', certificateLink: TNS },
      { name: 'Spring', icon: <SiSpring className="text-green-500" />, percentage: 90, details: 'Experience with Spring Framework for building robust, scalable, and secure Java applications.', certificateLink: TNS },
      { name: 'Hibernate', icon: <SiHibernate className="text-purple-500" />, percentage: 80, details: 'Familiar with Hibernate ORM for efficient database interactions in Java applications.', certificateLink: TNS },
      { name: 'SpringBoot', icon: <SiSpring className="text-green-600" />, percentage: 85, details: 'Developed microservices and RESTful APIs using Spring Boot for rapid application development.', certificateLink: TNS },
      { name: 'Python', icon: <SiPython className="text-blue-400" />, percentage: 60, details: 'Familiar with Python for scripting, data processing, and basic web development frameworks like Flask or Django.', certificateLink: Python },
    ],
    databases: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" />, percentage: 90, details: 'Extensive experience with MongoDB for NoSQL database design, data modeling, querying, and aggregation.' },
      { name: 'SQL', icon: <FaDatabase className="text-blue-700" />, percentage: 80, details: 'Proficient in SQL for relational database management, complex querying, and schema design (e.g., PostgreSQL, MySQL).' },
      { name: 'PostgreSQL', icon: <FaDatabase className="text-blue-600" />, percentage: 85, details: 'Experienced in using PostgreSQL for relational data modeling, writing advanced SQL queries, indexing, and ensuring data integrity in scalable applications.' },
      { name: 'MySQL', icon: <FaDatabase className="text-blue-500" />, percentage: 90, details: 'Used MySQL for relational database systems in full-stack applications.', certificateLink: TNS },
      { name: 'Firebase', icon: <FaDatabase className="text-orange-400" />, percentage: 70, details: 'Experience with Firebase Realtime Database and Firestore in React and mobile apps.' },
      { name: 'OracleDB', icon: <FaDatabase className="text-purple-600" />, percentage: 60, details: 'Basic understanding of OracleDB structure, tablespaces, and data types.' },
      { name: 'PL/SQL', icon: <FaDatabase className="text-purple-600" />, percentage: 65, details: 'Written PL/SQL procedures, triggers, and functions for data processing.' },
    ],
    tools: [
      { name: 'Git', icon: <FaGitAlt className="text-red-600" />, percentage: 90, details: 'Expert in version control using Git and collaborative development workflows (e.g., GitHub, GitLab, branching strategies).', certificateLink: TNS },
      { name: 'VS Code', icon: <span className="text-blue-400 text-3xl">&#9998;</span>, percentage: 95, details: 'Primary IDE for development, highly customized with extensions and settings for optimal efficiency and productivity.' },
      { name: 'Web Vitals', icon: <FaTachometerAlt className="text-green-500" />, percentage: 70, details: 'Understanding and application of Web Vitals metrics for optimizing website performance and user experience.' },
      { name: 'Redux', icon: <SiRedux className="text-purple-700" />, percentage: 80, details: 'Experience with Redux for predictable state management in complex React applications, including Redux Toolkit.' },
      { name: 'Routers', icon: <FaCode className="text-gray-600 dark:text-gray-300" />, percentage: 85, details: 'Proficient in implementing client-side routing using libraries like React Router for single-page applications.' },
    //{ name: 'SQL Workbench', icon: <FaDatabase className="text-blue-500" />, percentage: 70, details: 'Familiar with ER modeling, query design, and schema management using MySQL Workbench.' },
      { name: 'APIs', icon: <FaCode className="text-gray-600 dark:text-gray-300" />, percentage: 90, details: 'Strong ability to design, consume, and integrate RESTful and GraphQL APIs for various web applications.' },
    ],
  };

  // Manage how many skills to display per category, initial 6
  const [displayCounts, setDisplayCounts] = useState(() => {
    const counts = {};
    Object.keys(skills).forEach(category => {
      counts[category] = 6;
    });
    return counts;
  });

  // Load more skills for the category
  const handleLoadMore = (category) => {
    setDisplayCounts(prev => ({
      ...prev,
      [category]: Math.min(skills[category].length, prev[category] + 6),
    }));
  };

  // Open modal with skill details
  const openSkillModal = (skill) => {
    setSelectedSkill(skill);
    setIsSkillModalOpen(true);
  };

  // Close modal
  const closeSkillModal = () => {
    setIsSkillModalOpen(false);
    setSelectedSkill(null);
  };

  return (
    <section
      ref={ref}
      id="skills"
      className="py-16 px-8 min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden pt-24"
    >
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto text-lg text-gray-700 dark:text-gray-300 z-10 relative">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-blue-600">Skills</span>
        </motion.h2>

        {Object.entries(skills).map(([category, techStack]) => (
          <SkillCategoryScroller
            key={category}
            category={category}
            techStack={techStack.slice(0, displayCounts[category])}
            openSkillModal={openSkillModal}
            inView={inView}
            totalSkills={techStack.length}
            currentDisplayCount={displayCounts[category]}
            onLoadMore={() => handleLoadMore(category)}
          />
        ))}
      </div>

      <SkillDetailModal
        isOpen={isSkillModalOpen}
        onClose={closeSkillModal}
        skill={selectedSkill}
      />
    </section>
  );
}
