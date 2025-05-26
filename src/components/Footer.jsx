import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import social media icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        {/* Navigation Links - REMOVED */}
        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/upputharla-manikanta/" // Replace with your LinkedIn profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="text-3xl" />
          </a>
          <a
            href="https://github.com/Mani061212" // Replace with your GitHub profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub className="text-3xl" />
          </a>
          {/* Add more social media links here if needed, e.g., FaTwitter, FaInstagram */}
        </div>

        {/* Copyright Information */}
        <p className="text-center text-sm text-gray-400 mt-6">
          &copy; {currentYear} Manikanta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
