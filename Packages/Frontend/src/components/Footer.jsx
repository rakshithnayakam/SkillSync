import React from 'react';
import { BookOpenIcon, HeartIcon } from '@heroicons/react/24/solid';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { MdOutlineSecurity } from 'react-icons/md'; 

// --- Data Structure (Defined above) ---
const socialLinks = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: MdOutlineSecurity, href: "#" }, 
];

const footerNavigation = [
  {
    title: "Product",
    links: ["Features", "How It Works", "Pricing", "Testimonials"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community", "FAQ", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Main Grid: Branding + Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-x-10 gap-y-12">

          {/* Left Column: Logo, Description, and Socials */}
          <div className="md:col-span-2 lg:col-span-4">
            
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-4">
              {/* Using a gradient color mimic for the icon */}
              <BookOpenIcon className="w-8 h-8 text-white p-1 rounded-md" 
                style={{ background: 'linear-gradient(45deg, #2D9CDB, #27AE60)' }} 
              />
              <span className="text-xl font-semibold text-gray-800">SkillSync</span>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600 max-w-sm leading-relaxed">
              The premier platform for peer-to-peer skill exchange.
              <br />
              Learn new skills by teaching what you know.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-3">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="p-2 border border-gray-300 rounded-full text-gray-600 hover:text-gray-900 hover:border-gray-500 transition duration-150"
                    aria-label={`Link to ${item.icon.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Columns: Navigation Links */}
          <div className="md:col-span-4 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerNavigation.map((section) => (
              <div key={section.title}>
                {/* Section Title */}
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                  {section.title}
                </h3>
                {/* Links */}
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-600 text-sm hover:text-gray-900 transition duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider and Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            {/* Copyright */}
            <p className="order-2 md:order-1 mt-4 md:mt-0">
              © 2025 SkillSync. All rights reserved.
            </p>

            {/* Tagline */}
            <p className="order-1 md:order-2 flex items-center">
              Made with 
              <HeartIcon className="w-4 h-4 text-red-500 mx-1" />
              for learners and mentors worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;