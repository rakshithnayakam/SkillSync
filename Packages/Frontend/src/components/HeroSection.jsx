import React from 'react';
// Only keep icons used within the hero section content
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'; 

// Data arrays (removed navLinks as they are no longer needed)
const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '500+', label: 'Skills Available' },
  { value: '50K+', label: 'Exchanges Made' },
];

const HeroSection = () => {
  return (
    // Adjusted padding for the top since the navbar is removed
    <div className="min-h-screen bg-white relative overflow-hidden pt-20 pb-16">
      
      {/* Subtle Gradient Background Effect (Kept for the visual style shown in the image) */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ background: 'radial-gradient(circle at 10% 20%, #f0f7ff, transparent 50%)' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Section (Grid Layout) */}
        <main className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Text and CTAs */}
          <div className="order-2 lg:order-1 pt-4 lg:pt-0">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center bg-blue-50 text-blue-700 py-1 px-3 rounded-full text-sm font-medium mb-6">
                <SparklesIcon className="w-4 h-4 mr-1" />
                Learn by Teaching, Teach by Learning
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Exchange Skills, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
                Unlock Potential
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Join SkillSync, where learning meets collaboration. Share your expertise, discover
              new talents, and grow together in a community of passionate learners and mentors.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              
              {/* Primary Button */}
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-xl text-white 
                bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 
                shadow-lg shadow-teal-500/40 transition duration-300 transform hover:scale-[1.01]">
                Start Learning
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </button>

              {/* Secondary Button */}
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-xl 
                text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition duration-150">
                Become a Mentor
              </button>
            </div>

            {/* Statistics */}
            <div className="mt-12 pt-6 flex space-x-8 sm:space-x-12 border-t border-gray-100">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-2xl font-bold text-teal-600">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
          
          {/* Right Column: Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full h-auto max-w-xl">
              {/* Placeholder Image container matching the style */}
              <div className="rounded-2xl shadow-2xl overflow-hidden bg-gray-100 p-2 transform translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1521737604879-66170d440854?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="A diverse group of students collaborating enthusiastically around a laptop in a lecture hall setting."
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HeroSection;