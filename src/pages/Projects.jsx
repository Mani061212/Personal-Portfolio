import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../components/ProjectCard'; 
import ProjectDetailModal from '../components/ProjectDetailModal';
import ParticlesBackground from '../components/ParticlesBackground';


import ECom1 from '../assets/Images/E-com1.png';
import ECom2 from '../assets/Images/E-com2.png';
import ECom3 from '../assets/Images/E-com3.png';
import ECom4 from '../assets/Images/E-com4.png';
import ECom5 from '../assets/Images/E-com5.png';

import Weather0 from '../assets/Images/WeatherApp.png';
import Weather1 from '../assets/Images/WeatherApp1.png';
import Weather2 from '../assets/Images/WeatherApp2.png';
import Weather3 from '../assets/Images/WeatherApp3.png';
import Weather4 from '../assets/Images/WeatherApp4.png';
import Weather5 from '../assets/Images/WeatherApp5.png';

import TicTacToe0 from '../assets/Images/TIc-Tac-Toe.png';
import TicTacToe1 from '../assets/Images/TIc-Tac-Toe1.png';
import TicTacToe2 from '../assets/Images/TIc-Tac-Toe2.png';
import TicTacToe3 from '../assets/Images/TIc-Tac-Toe3.png';
import TicTacToe4 from '../assets/Images/TIc-Tac-Toe4.png';
import TicTacToe5 from '../assets/Images/TIc-Tac-Toe5.png';

import Profile0 from '../assets/Images/Portfolio.png';
import Profile1 from '../assets/Images/Portfolio1.png';
import Profile2 from '../assets/Images/Portfolio2.png';
import Profile3 from '../assets/Images/Portfolio3.png';
import Profile4 from '../assets/Images/Portfolio4.png';
import Profile5 from '../assets/Images/Portfolio5.png';
import Profile6 from '../assets/Images/Portfolio6.png';

import Safeguard0 from '../assets/Images/Safeguard.png';
import Safeguard1 from '../assets/Images/Safeguard2.png';
import Safeguard2 from '../assets/Images/Safeguard2.png';
import Safeguard3 from '../assets/Images/Safeguard3.png';
import Safeguard4 from '../assets/Images/Safeguard4.png';
import Safeguard5 from '../assets/Images/Safeguard5.png';


// Icon imports (keep these if you use them in ProjectCard or elsewhere in Projects.js)
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaGitAlt,
    FaJava, FaPython, FaDocker, FaAws
} from 'react-icons/fa';
import {
    SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiTypescript, SiSpring,
    SiHibernate, SiRedux, SiFirebase, SiMysql, SiPostgresql, SiKubernetes, SiTerraform,
    SiGraphql, SiNestjs, SiPrisma
} from 'react-icons/si';


export default function Projects() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query
    const [isProjectModalOpen, setIsProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const scrollContainerRef = useRef(null); // Ref for the outer scrollable div
    const contentRef = useRef(null); // Ref for the inner div containing one set of project cards
    const [isScrolling, setIsScrolling] = useState(true); // Controls automatic scrolling
    const [singleContentWidth, setSingleContentWidth] = useState(0); // Stores the width of one full set of cards

    const openProjectModal = (project) => {
        setSelectedProject(project);
        setIsProjectModal(true);
    };

    const closeProjectModal = () => {
        setIsProjectModal(false);
        setSelectedProject(null);
    };

    // --- Projects Data (Single Array) ---
    const projects = [
        {
            id: 1,
            title: 'SafeGuard Application',
            description: 'SafeGuard ensures secure data sharing using proxy re-encryption and blockchain technology. It prevents unauthorized  access with end-to-end encryption and Ethereum smart contracts for tamper-proof security, it provides a scalable solution for privacy-preserving file exchange in healthcare and finance.',
            overview: `
            SafeGuard is a secure data-sharing platform that integrates proxy re-encryption with Ethereum blockchain 
            to ensure data confidentiality, integrity, and transparency. This full-stack application features a 
            user-friendly React-based UI, and demonstrates: 1. 100% data confidentiality across 1,000+ transactions , 2. 25% reduction in user interaction time using optimized UI and graph algorithms `,
            images: [Safeguard0, Safeguard1, Safeguard2, Safeguard3, Safeguard4, Safeguard5],
            technologies: ['Java', 'Spring Boot', 'React', 'SQLyog', 'Ethereum', 'Solidity', 'Proxy Re-Encryption','Apache'], 
            githubLink: 'https://github.com/Mani061212/SafeGuard-Secure-Data-Sharing-with-Blockchain',
            // liveDemoLink: '#',
        },
        {
            id: 2,
            title: 'Personal Portfolio Website',
            description: 'Designed and developed a modern, performant portfolio website using React.js for static site generation. Leveraged Tailwind CSS for rapid and consistent styling, and Framer Motion for engaging animations and transitions. Prioritized SEO and accessibility.',
            overview: 'This portfolio effectively showcases my technical expertise and creative solutions. Its designed for optimal user experience, featuring smooth animations and a responsive layout. The site serves as a dynamic resume, detailing my development journey and capabilities. I ve prioritized strong SEO and broad accessibility for wider reach. Its robust architecture supports easy and efficient content updates, making it a living showcase.',
            images: [Profile0,Profile1, Profile2, Profile3, Profile4, Profile5,Profile6],
            technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite','HTML5','CSS3','React Router','OpenAPI','JavaScript(ES6)','Next.js'],
            githubLink: '#',
            liveDemoLink: '#',
        },
        {
            id: 3,
            title: 'E-commerce Platform',
            description: 'My E-Commerce App is a modern, responsive online shopping platform designed to provide a seamless Browse and purchasing experience. It allows users to explore a diverse range of products, efficiently manage their shopping cart, and discover items through intuitive search and filtering capabilities. Built with a focus on performance and user experience, this application demonstrates a robust front-end architecture for contemporary web commerce.',
            overview: 'This application serves as a dynamic and responsive e-commerce storefront, designed to offer users a seamless shopping experience. It features comprehensive product listings, detailed product pages, and a fully functional shopping cart where users can easily add, update quantities, and remove items. The interface is highly interactive, allowing customers to efficiently discover products through intuitive search functionality, precise category filtering, and flexible price range controls. Built with a focus on user comfort and adaptability, the platform includes a convenient dark mode toggle and ensures a consistent, optimized experience across all device sizes. All product filtering and cart state management are handled client-side, contributing to a fast and smooth Browse experience. This app demonstrates a robust front-end architecture for modern web commerce.',
            images: [ECom1, ECom2, ECom3, ECom4, ECom5], // Array of images
            technologies: ['React.js', 'Next.js', 'Headless UI', 'TypeScript', 'Tailwind CSS 3', 'Axios'],
            githubLink: 'https://github.com/Mani061212/E-Commerce-Platform',
            // liveDemoLink: '#',
        },
        {
            id: 4,
            title: 'Tic-Tac-Toe Game',
            description: 'A modern, interactive Tic Tac Toe game developed using React.js and styled with Tailwind CSS, featuring a dynamic dark/light mode, custom win/draw quotes, and a comprehensive game history.',
            overview: 'This project delivers a responsive and engaging web-based implementation of the classic Tic Tac Toe game, designed for two players. It provides a fluid user experience where participants take turns marking squares on a 3x3 grid. The game continues until one player successfully achieves three of their marks in a row (horizontally, vertically, or diagonally) or the entire board is filled, resulting in a draw. Beyond the core gameplay, the application incorporates several dynamic features to enhance usability and interaction. This includes a user-friendly dark/light mode toggle for customizable aesthetics, alongside celebratory modals that appear upon game completion, which are enriched with curated custom quotes. Furthermore, a detailed game history sidebar allows players to review previous moves and even "time travel" back to any point in the games progression. Visual feedback, such as highlighted winning lines and subtle animations for game victories, contributes to an intuitive and satisfying experience.',
            images: [TicTacToe0,TicTacToe1, TicTacToe2, TicTacToe3, TicTacToe4, TicTacToe5], // Array of images
            technologies: ['HTML', 'CSS', 'JavaScript (ES6+)' ,'React.js' , 'Vite' , 'Tailwind CSS'],
            githubLink: 'https://github.com/Mani061212/Tic-Tac-Toe-Game',
            // liveDemoLink: '#',
        },
        {
            id: 5,
            title: 'Weather Dashboard',
            description: 'A sleek and responsive weather app built with React, Vite, and Tailwind CSS. Get real-time weather updates and a 5-day forecast for any city worldwide using the OpenWeatherMap API.',
            overview: 'The WeatherWise Dashboard is a modern, interactive web application designed to provide users with instant access to current weather conditions and a detailed 5-day forecast for any location around the globe. Built with a focus on a seamless user experience, it features a clean, two-column layout that intelligently adapts to various screen sizes, ensuring optimal readability and navigation whether on a desktop, tablet, or mobile device. Users can effortlessly search for weather information by city name or leverage their devices geolocation for immediate local weather updates. Beyond just displaying data, WeatherWise enhances the users interaction with dynamic background gradients that visually reflect the current weather, alongside subtle hover and shadow effects on interactive elements. The inclusion of a temperature trend chart offers a quick visual summary of the upcoming weeks weather patterns, making it easy to anticipate changes. This dashboard serves as a comprehensive and visually engaging tool for staying informed about weather conditions.',
            images: [Weather0,Weather1, Weather2, Weather3, Weather4, Weather5], // Array of images
            technologies: ['React', 'OpenWeather API', 'Axios', 'Vite' , 'Tailwind CSS', 'Recharts'],
            githubLink: 'https://github.com/Mani061212/Weather-App',
            // liveDemoLink: '#',
        },
    ];
    // --- End of Projects Data ---

    // Handler for search input changes
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // If there's a search query, stop automatic scrolling
        setIsScrolling(query === '');
    };

    // Filter projects based on the search query
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    // Callback to measure content width, memoized for efficiency
    const measureContentWidth = useCallback(() => {
        // Only measure if there are projects and no search query (for infinite scroll)
        if (contentRef.current && scrollContainerRef.current && projects.length > 0 && searchQuery === '') {
            const firstCardElement = contentRef.current.querySelector('.flex-shrink-0.w-80.flex-none');

            if (!firstCardElement) {
                console.warn(`Projects.js: First project card element not found for width measurement. Cannot calculate scrolling width.`);
                return;
            }

            const cardWidth = firstCardElement.offsetWidth;
            const computedStyle = window.getComputedStyle(firstCardElement);
            const marginRight = parseFloat(computedStyle.marginRight);

            const numCards = projects.length; // Use original projects length for full scroll width
            const calculatedSingleWidth = (numCards * cardWidth) + (Math.max(0, numCards - 1) * marginRight);

            if (calculatedSingleWidth > 0 && Math.abs(calculatedSingleWidth - singleContentWidth) > 1) {
                setSingleContentWidth(calculatedSingleWidth);
                // Initialize scroll position to the start of the *second* set of content for seamless loop
                scrollContainerRef.current.scrollLeft = calculatedSingleWidth;
            }
        } else if (searchQuery !== '') {
            // If search query is active, reset singleContentWidth to 0 to disable continuous scroll logic
            setSingleContentWidth(0);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft = 0; // Reset scroll position for search results
            }
        }
    }, [singleContentWidth, projects, searchQuery]); // Depend on projects and searchQuery

    // Effect 1: Run measurement on mount, resize, and when search query changes
    useEffect(() => {
        const timeoutId = setTimeout(measureContentWidth, 100);
        window.addEventListener('resize', measureContentWidth);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', measureContentWidth);
        };
    }, [measureContentWidth]);

    // Effect 2: Handle automatic horizontal scrolling using requestAnimationFrame
    useEffect(() => {
        let animationFrameId;
        const scrollContainer = scrollContainerRef.current;

        const animateScroll = () => {
            // Only scroll if `isScrolling` is true (i.e., no active search query) and in view
            if (scrollContainer && isScrolling && singleContentWidth > 0 && inView) {
                scrollContainer.scrollLeft += 1;

                // Loop logic: When the scroll position reaches the end of the *first* set of content,
                // instantly jump back to the start of the *first* set.
                if (scrollContainer.scrollLeft >= singleContentWidth) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(animateScroll);
        };

        if (isScrolling && singleContentWidth > 0 && inView) {
            animationFrameId = requestAnimationFrame(animateScroll);
        } else {
            cancelAnimationFrame(animationFrameId);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isScrolling, singleContentWidth, inView]);

    // Pause scrolling on mouse enter, resume on mouse leave
    const handleMouseEnter = () => {
        if (searchQuery === '') { // Only pause if no search is active
            setIsScrolling(false);
        }
    };
    const handleMouseLeave = () => {
        if (searchQuery === '') { // Only resume if no search is active
            setIsScrolling(true);
        }
    };


    return (
        <section ref={ref} id="projects" className="py-16 px-8 min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden pt-24">
            {/* Particle Background */}
            <ParticlesBackground />

            <div className="max-w-7xl mx-auto text-lg text-gray-700 dark:text-gray-300 z-10 relative">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: -50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    My <span className="text-blue-600">Projects</span>
                </motion.h2>

                {/* Search Bar */}
                <div className="flex justify-center mb-12">
                    <input
                        type="text"
                        placeholder="Search projects by name, description, or tech..."
                        className="w-full max-w-md p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Project Display Area */}
                {filteredProjects.length > 0 ? (
                    <div
                        ref={scrollContainerRef}
                        className="w-full md:w-[960px] mx-auto overflow-x-auto p-4 custom-scrollbar"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div ref={contentRef} className="flex space-x-8 px-2 min-w-max">
                            {/* Conditionally render duplicated content for infinite scroll */}
                            {searchQuery === '' ? (
                                <>
                                    {/* First set of original projects */}
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={`project-1-${project.id}-${index}`} // Unique key for first set
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex-shrink-0 w-80 flex-none"
                                        >
                                            <ProjectCard project={project} onClick={() => openProjectModal(project)} />
                                        </motion.div>
                                    ))}
                                    {/* Duplicate set of original projects for seamless loop */}
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={`project-2-${project.id}-${index}`} // Unique key for second set
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex-shrink-0 w-80 flex-none"
                                        >
                                            <ProjectCard project={project} onClick={() => openProjectModal(project)} />
                                        </motion.div>
                                    ))}
                                </>
                            ) : (
                                // Render only filtered projects when search query is active
                                filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={`filtered-project-${project.id}-${index}`} // Unique key for filtered results
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex-shrink-0 w-80 flex-none"
                                    >
                                        <ProjectCard project={project} onClick={() => openProjectModal(project)} />
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <motion.p
                        className="text-center text-gray-600 dark:text-gray-400 text-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No projects found matching your search.
                    </motion.p>
                )}
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                isOpen={isProjectModalOpen}
                onClose={closeProjectModal}
                project={selectedProject}
            />
        </section>
    );
}
