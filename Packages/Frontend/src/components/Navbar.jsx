import React, { useState, useEffect } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Explore Skills', href: '#' },
    { name: 'How It Works', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'About', href: '#' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Dynamic Tailwind Classes for the Navbar Container
    const navbarClasses = isScrolled
        ? 'bg-white shadow-md border-b border-gray-100'
        : 'bg-white/50 backdrop-blur-sm border-b border-gray-100/70';

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-100 ${navbarClasses}`}
        >
            <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
                
                {/* Main container uses justify-between to space the three major sections */}
                <div className="flex justify-between items-center h-16">
                    
                    {/* 1. Logo Area (Left Side) */}
                    {/* We keep this div separate from the links */}
                    <div className="flex items-center space-x-3">
                        {/* Icon: Gradient background */}
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-teal-600">
                            <BookOpenIcon className="h-6 w-6 text-white" />
                        </div>
                        
                        {/* Text: SkillSync */}
                        <span className="text-lg font-sans bg-gradient-to-br from-blue-400 to-teal-600 text-transparent bg-clip-text font-semibold">
                            SkillSync
                        </span>
                    </div>

                    {/* 2. Navigation Links (Center) */}
                    {/* This block is now independent, allowing it to be centered */}
                    <div className="hidden md:flex items-center space-x-7 lg:space-x-10">
                        {navItems.map((item) => (
                            <a 
                                key={item.name} 
                                href={item.href} 
                                className="text-md font-medium text-gray-800 hover:text-gray-900 transition duration-150"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* 3. Action Buttons (Right Side) */}
                    <div className="flex items-center space-x-3">
                        
                        {/* Login Button */}
                        <a 
                            href="#" 
                            className="px-4 py-2 text-sm font-semibold rounded-xl 
                                       bg-blue-50 text-blue-700 
                                       transition duration-300 
                                       hover:bg-blue-100"
                        >
                            Login
                        </a>

                        {/* Sign Up Button */}
                        <a 
                            href="#" 
                            className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition duration-300
                                       bg-gradient-to-r from-cyan-400 to-teal-500 
                                       hover:from-cyan-500 hover:to-teal-600
                                       shadow-md shadow-cyan-500/30"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
