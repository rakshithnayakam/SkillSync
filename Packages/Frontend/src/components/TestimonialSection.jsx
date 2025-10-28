import React from 'react';

// --- Icon Helpers ---

// Recreates the filled yellow star
const StarFilled = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-yellow-400" 
        viewBox="0 0 20 20" 
        fill="currentColor"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.05a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.817-2.05a1 1 0 00-1.176 0l-2.817 2.05c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.817-2.05c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
);

// Recreates the arrow button (simulated left arrow)
const ArrowButton = ({ direction = 'left' }) => (
    <button className="w-10 h-10 rounded-full border border-gray-300 bg-white shadow-md flex items-center justify-center hover:border-gray-400 transition">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`w-5 h-5 text-gray-500 ${direction === 'right' ? 'rotate-180' : ''}`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    </button>
);


// --- Dummy Data (Using the image content) ---
const testimonialData = {
    rating: 5,
    quote: "SkillSync helped me learn web development while teaching design. The exchange is so rewarding and I've made amazing connections!",
    author: "Sarah Johnson",
    role: "Graphic Designer",
    avatarUrl: "https://i.pravatar.cc/150?img=49" // Placeholder image
};


// --- 1. Testimonial Card Component ---
const TestimonialCard = ({ data }) => {
    return (
        <div className="relative max-w-2xl mx-auto mt-8 p-10 bg-white rounded-2xl shadow-xl">
            
            {/* Large Transparent Quote Icon */}
            <span 
                className="
                    absolute top-6 right-8 
                    text-7xl font-extrabold text-blue-500 
                    opacity-10 pointer-events-none 
                    leading-none
                "
            >
                ”
            </span>

            {/* Star Rating */}
            <div className="flex space-x-0.5 mb-4">
                {[...Array(data.rating)].map((_, i) => (
                    <StarFilled key={i} />
                ))}
            </div>

            {/* Quote Text */}
            <p className="text-lg text-gray-700 leading-relaxed mb-8 relative z-10">
                "{data.quote}"
            </p>

            {/* Author Info */}
            <div className="flex items-center space-x-4">
                <img 
                    src={data.avatarUrl} 
                    alt={data.author} 
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md"
                />
                <div>
                    <p className="font-semibold text-gray-900">{data.author}</p>
                    <p className="text-sm text-gray-500">{data.role}</p>
                </div>
            </div>
        </div>
    );
};


// --- 2. Main Component ---
const TestimonialSection = () => {
    return (
        <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Text */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-md text-gray-600 max-w-xl mx-auto">
                        Join thousands of satisfied learners and mentors who have transformed their skills through SkillSync.
                    </p>
                </div>

                {/* Testimonial Card */}
                <TestimonialCard data={testimonialData} />
                
                {/* Slider Controls */}
                <div className="flex justify-center items-center mt-10 space-x-4">
                    
                    {/* Previous Button */}
                    <ArrowButton direction="left" />

                    {/* Pagination Dots */}
                    <div className="flex space-x-2">
                        {/* Current (Blue) */}
                        <div className="w-6 h-2 rounded-full bg-blue-600 transition-colors duration-300"></div>
                        {/* Inactive */}
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>

                    {/* Next Button */}
                    <ArrowButton direction="right" />

                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;