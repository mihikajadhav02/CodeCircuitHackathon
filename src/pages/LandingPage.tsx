import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Wanderlog
                </span>
              </h1>
              <p className="text-2xl font-medium text-purple-600">✨ Your Magical Travel Companion ✨</p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                Turn your travel dreams into delightful adventures, one plan at a time!
              </p>
            </div>
            
            {/* CTA Button */}
            <button
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full 
                         text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
                         transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                         animate-pulse hover:animate-none"
            >
              ✈️ Start Your Adventure
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-purple-600 mb-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Magical Planning ✨</h3>
                <p className="mt-2 text-gray-600">Create enchanting day-by-day itineraries in moments</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-purple-600 mb-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Smart Discovery 🎯</h3>
                <p className="mt-2 text-gray-600">Get delightful suggestions tailored just for you</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-purple-600 mb-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Easy Sharing 💫</h3>
                <p className="mt-2 text-gray-600">Share the magic with friends and family instantly</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 text-sm text-gray-500">
              <p>✨ Making travel planning magical ✨</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 