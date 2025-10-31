import React from 'react';

// --- Icon Helpers ---

const CheckIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-4 h-4 text-green-500 mr-1" 
        viewBox="0 0 20 20" 
        fill="currentColor"
    >
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-4 h-4 ml-2" 
        viewBox="0 0 20 20" 
        fill="currentColor"
    >
        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L12.586 12H4a1 1 0 110-2h8.586l-2.293-2.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const SparkleIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-4 h-4 text-blue-500 mr-2" 
        viewBox="0 0 20 20" 
        fill="currentColor"
    >
        <path d="M11.968 2.394a1 1 0 00-.736-.395h-2.464a1 1 0 00-.736.395l-.64 1.152L5.394 4.5a1 1 0 00-.395.736v2.464a1 1 0 00.395.736l1.152.64L6.5 10.968a1 1 0 00.736.395h2.464a1 1 0 00.736-.395l.64-1.152L12.464 9.5a1 1 0 00.395-.736V6.3a1 1 0 00-.395-.736l-1.152-.64-.64-1.152z" />
        <path fillRule="evenodd" d="M17.707 16.707a1 1 0 000-1.414l-2.793-2.793a1 1 0 00-1.414 0l-2.793 2.793a1 1 0 000 1.414l2.793 2.793a1 1 0 001.414 0l2.793-2.793z" clipRule="evenodd" />
    </svg>
);

const AssuranceItem = ({ text }) => (
    <div className="flex items-center text-sm text-gray-600">
        <CheckIcon />
        <span>{text}</span>
    </div>
);


// --- Main Component ---
const CTABanner = () => {
    return (
        <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Gradient Border Container */}
                <div 
                    className="
                        p-0.5 
                        rounded-3xl 
                        bg-gradient-to-r 
                        from-blue-400 via-teal-300 to-green-400 
                        shadow-lg
                    "
                >
                    <div 
                        className="
                            bg-white 
                            rounded-[1.4rem] 
                            p-12 
                            flex flex-col 
                            items-center 
                            text-center
                        "
                    >
                        {/* Tagline */}
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4">
                            <SparkleIcon />
                            <span className="text-sm font-medium text-blue-600">Start Your Journey Today</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Ready to Exchange Skills?
                        </h2>

                        {/* Description */}
                        <p className="text-md text-gray-600 max-w-lg mb-8">
                            Join our growing community of learners and mentors. Share your expertise, learn something new, and make meaningful connections along the way.
                        </p>

                        {/* Buttons */}
                        <div className="flex space-x-4 mb-8">
                            <a
                                href="/signup"
                                className="
                                    flex items-center 
                                    px-6 py-3 
                                    text-white 
                                    font-semibold 
                                    rounded-lg 
                                    shadow-md 
                                    transition duration-300
                                    bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600
                                "
                            >
                                Get Started Free
                                <ArrowRightIcon />
                            </a>
                            <a
                                href="/learn-more"
                                className="
                                    px-6 py-3 
                                    text-gray-800 
                                    font-semibold 
                                    rounded-lg 
                                    border border-gray-300 
                                    bg-white hover:bg-gray-50 
                                    transition duration-300
                                "
                            >
                                Learn More
                            </a>
                        </div>

                        {/* Assurance Icons */}
                        <div className="flex flex-wrap justify-center space-x-6">
                            <AssuranceItem text="No credit card required" />
                            <AssuranceItem text="Free forever plan" />
                            <AssuranceItem text="Cancel anytime" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTABanner;