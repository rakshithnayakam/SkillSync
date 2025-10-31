import React, { useState } from 'react';

// --- Icon Helper ---
const ChevronDownIcon = ({ isOpen }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);


// --- FAQ Data Structure ---
const faqData = [
    {
        question: "How does SkillSync work?",
        answer: "SkillSync is a peer-to-peer exchange platform. You offer a skill you possess (e.g., cooking) in exchange for a skill you want to learn (e.g., Spanish). Our matching algorithm connects users with complementary skills and learning goals.",
    },
    {
        question: "Is SkillSync really free?",
        answer: "Yes! Our Basic plan is entirely free, offering core features like skill matching and a limited number of exchanges per month. We also offer affordable Pro and Teams plans for unlimited exchanges and advanced features.",
    },
    {
        question: "How long does a typical skill exchange take?",
        answer: "Exchange duration varies based on the skills and user preferences, but most structured exchanges last between 6 and 12 weeks, with a recommended weekly session time.",
    },
    {
        question: "What if I'm not satisfied with my match?",
        answer: "We offer a built-in resolution process and guarantee satisfaction. If a match isn't working, you can easily switch partners. Paid plans include dedicated support to ensure successful pairings.",
    },
    {
        question: "Can I exchange multiple skills at once?",
        answer: "Yes, advanced users often participate in multiple simultaneous exchanges, both teaching and learning different skills. The Pro plan facilitates this with unlimited exchanges.",
    },
    {
        question: "How do you ensure quality and safety?",
        answer: "All users are verified, and we rely on community ratings and feedback. We provide safety guidelines and moderation to maintain a high-quality and trustworthy environment.",
    },
    {
        question: "What types of skills can I learn or teach?",
        answer: "Our categories cover everything from Programming and Design to Languages, Cooking, Fitness, and DIY & Crafts. If you have a skill, you can probably exchange it!",
    },
    {
        question: "How does the gamification system work?",
        answer: "Our gamification system awards Skill Points, Badges, and Levels for participation, successful exchanges, and positive feedback, encouraging continuous learning and mentoring.",
    },
];


// --- FAQ Item Component (The Accordion Piece) ---
const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div 
            className="
                mb-3 
                rounded-lg 
                border border-gray-200 
                bg-white 
                overflow-hidden 
                transition-all 
                duration-300
            "
        >
            {/* Question Header (Clickable) */}
            <button
                className="
                    flex justify-between items-center 
                    w-full 
                    px-6 py-4 
                    text-left 
                    text-gray-800 
                    font-medium 
                    hover:bg-gray-50
                "
                onClick={onClick}
            >
                {question}
                <ChevronDownIcon isOpen={isOpen} />
            </button>

            {/* Answer Content (Collapsible) */}
            <div
                className={`transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'
                }`}
            >
                <p className="px-6 pb-4 text-gray-600 text-sm">
                    {answer}
                </p>
            </div>
        </div>
    );
};


// --- Main Component ---
const FAQSection = () => {
    // State to manage which FAQ item is currently open (stores the index)
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Text */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-md text-gray-600 max-w-lg mx-auto">
                        Have questions? We've got answers. Can't find what you're looking for? Contact our support team.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <FAQItem 
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>

                {/* Contact Support Link */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-2">
                        Still have questions?
                    </p>
                    <a 
                        href="/contact" 
                        className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
                    >
                        Contact Support →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;