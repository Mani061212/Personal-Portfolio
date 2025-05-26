import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticlesBackground from '../components/ParticlesBackground';



import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Contact() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        const formspreeEndpoint = process.env.FormAPI;; 

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitMessage('Message sent successfully! I will get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
                // Formspree typically redirects to a success page by default for non-AJAX forms.
                // With 'Accept': 'application/json', it will return a JSON response instead of redirecting.
            } else {
                const errorData = await response.json();
                console.error('Formspree error:', errorData);
                // Formspree returns specific error messages, e.g., if reCAPTCHA fails
                setSubmitMessage(`Failed to send message: ${errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);

            setTimeout(() => {
                setSubmitMessage('');
            }, 3000); 
        }
    };

    return (
        <section ref={ref} id="contact" className="py-16 px-8 min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden pt-32">
            {/* Particle Background */}
            <ParticlesBackground />

            <div className="max-w-7xl mx-auto text-lg text-gray-700 dark:text-gray-300 z-10 relative">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: -50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Get In <span className="text-blue-600">Touch</span>
                </motion.h2>

                <motion.p
                    className="text-center text-xl mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Have a question or want to work together? Feel free to reach out.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    {/* Contact Information Section */}
                    <motion.div
                        className="bg-white/5 dark:bg-gray-800/20 rounded-xl shadow-lg backdrop-blur-md p-8 flex flex-col justify-between border border-gray-300/20 dark:border-gray-700/30"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Info</h3>
                        <div className="space-y-6">
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <FaEnvelope className="text-blue-600 text-2xl mr-4" />
                                <span>21D41A05Q2@GMAIL.COM</span> { }
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <FaPhoneAlt className="text-blue-600 text-2xl mr-4" />
                                <span>+91 630 504 8027</span>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <FaMapMarkerAlt className="text-blue-600 text-2xl mr-4" />
                                <span>Hyderabad, Telangana, India</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connect with me:</h4>
                            <div className="flex space-x-6">
                                <a href="https://www.linkedin.com/in/upputharla-manikanta/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors">
                                    <FaLinkedin className="text-4xl" />
                                </a>
                                <a href="https://github.com/Mani061212" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                                    <FaGithub className="text-4xl" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Section */}
                    <motion.div
                        className="bg-white/5 dark:bg-gray-800/20 rounded-xl shadow-lg backdrop-blur-md p-8 border border-gray-300/20 dark:border-gray-700/30"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending Message...' : 'Send Message'}
                            </button>
                            {submitMessage && (
                                <p className={`mt-4 text-center text-lg ${submitMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                                    {submitMessage}
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
