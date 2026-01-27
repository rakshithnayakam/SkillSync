import React from "react";

const BellIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.424-1.921..." />
  </svg>
);

const MessageIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75a1.5 1.5..." />
  </svg>
);

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500">
      <div className="w-4 h-4 rounded-full border-2 border-white bg-red-400"></div>
    </div>
    <span className="text-xl font-semibold text-gray-800">SkillSync</span>
  </div>
);

const NotificationIcons = () => (
  <div className="flex items-center space-x-5 text-gray-500">
    <div className="relative cursor-pointer">
      <BellIcon className="w-6 h-6" />
    </div>
    <div className="relative cursor-pointer">
      <MessageIcon className="w-6 h-6" />
    </div>
  </div>
);

const DashboardNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm z-40">
      <div className="flex items-center justify-between h-full px-6">
        <Logo />
        <NotificationIcons />
      </div>
    </header>
  );
};

export default DashboardNavbar;
