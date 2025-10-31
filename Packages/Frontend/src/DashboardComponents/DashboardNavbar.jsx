import React from 'react';

// Simplified icons for the top right (Bell, Message, Profile)
const BellIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.424-1.921 1.05 1.05 0 00-.518-1.986 4.673 4.673 0 01-.176-7.514C19.8 4.298 17.15 3.5 14.49 3.5A7.492 7.492 0 007.008 10.992c-.176 1.348-.716 2.656-1.576 3.768a1.05 1.05 0 00-.518 1.986c2.054.677 4.253 1.056 6.55 1.056H12a.5.5 0 01.5.5v.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-.5a.5.5 0 01.5-.5h1z" /></svg>;
const MessageIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75a1.5 1.5 0 011.5-1.5h16.5a1.5 1.5 0 011.5 1.5v5.25a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-5.25zM2.25 12.75V7.5a1.5 1.5 0 011.5-1.5h16.5a1.5 1.5 0 011.5 1.5v5.25" /></svg>;

const DashboardNavbar = () => {
  // Brand Logo and Name
  const Logo = () => (
    <div className="flex items-center space-x-2">
      {/* Target Logo/Icon - Use a placeholder color/shape */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500">
        <div className="w-4 h-4 rounded-full border-2 border-white bg-red-400"></div>
      </div>
      <span className="text-xl font-semibold text-gray-800">SkillSync</span>
    </div>
  );

  // Notification/Message Icons with Badges
  const NotificationIcons = () => (
    <div className="flex items-center space-x-5 text-gray-500">
      {/* Notification Bell */}
      <div className="relative cursor-pointer hover:text-gray-700">
        <BellIcon className="w-6 h-6" />
        <span className="absolute top-[-5px] right-[-8px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform bg-indigo-500 rounded-full">3</span>
      </div>

      {/* Message Icon */}
      <div className="relative cursor-pointer hover:text-gray-700">
        <MessageIcon className="w-6 h-6" />
        <span className="absolute top-[-5px] right-[-8px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform bg-indigo-500 rounded-full">5</span>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-3 ml-6 cursor-pointer border-l pl-6">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src="https://via.placeholder.com/150/0000FF/FFFFFF?text=J" // Placeholder avatar
          alt="User Avatar"
        />
        <span className="text-sm font-medium text-gray-800 hidden sm:inline">
          Jordan Smith
        </span>
      </div>
    </div>
  );

  return (
    // Fixed position spanning the top, standard h-16 (4rem) height
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40">
      <div className="flex items-center justify-between h-full px-6">
        <Logo />
        <NotificationIcons />
      </div>
    </header>
  );
};

export default DashboardNavbar;