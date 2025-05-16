import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="space-y-8 max-w-4xl">
            {/* Hero Section with Animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1
                className="text-6xl md:text-7xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Wanderlog
                </span>
              </motion.h1>
              
              <motion.p
                className="text-2xl font-medium text-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                ✨ Your Magical Travel Companion ✨
              </motion.p>

              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Turn your travel dreams into delightful adventures, one plan at a time!
              </motion.p>
            </motion.div>
            
            {/* Animated CTA Button */}
            <motion.button
              onClick={() => navigate('/planner')}
              className="group relative inline-flex items-center px-8 py-4 text-lg font-medium
                       rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 
                       transform transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">✈️ Start Your Adventure</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20
                         transition-opacity duration-300"
                initial={false}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.button>

            {/* Features Section with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md 
                           hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-purple-600 mb-4">
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full 
                                flex items-center justify-center"
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Magical Planning ✨",
    description: "Create enchanting day-by-day itineraries in moments",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: "Smart Discovery 🎯",
    description: "Get delightful suggestions tailored just for you",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Easy Sharing 💫",
    description: "Share the magic with friends and family instantly",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

export default LandingPage; 