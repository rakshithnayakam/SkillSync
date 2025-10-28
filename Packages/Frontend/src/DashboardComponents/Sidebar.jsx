import React from 'react';

// Using simple SVG icons for demonstration, matching the visual style.
const icons = {
  Dashboard: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM14.25 6a2.25 2.25 0 012.25-2.25h2.25A2.25 2.25 0 0121 6v2.25a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25V6zM14.25 14.25a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25zM3.75 14.25a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>,
  MySkills: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.03 0-2.05.088-3.048.252 1.102 1.821 2.304 3.498 3.652 5.034L12 18l5.39-7.25c1.348-1.536 2.55-3.213 3.652-5.034A8.967 8.967 0 0018 3.75c-2.825 0-5.54 1.09-7.5 3.064M12 6.042c-2.585-2.316-6.075-3.328-9.064-2.812a1.5 1.5 0 00-1.68 1.042l-1.04 4.09c-.198.78.358 1.62 1.14 1.836l3.52 1.348M12 6.042c2.585-2.316 6.075-3.328 9.064-2.812a1.5 1.5 0 011.68 1.042l1.04 4.09c.198.78-.358 1.62-1.14 1.836l-3.52 1.348" /></svg>,
  Requests: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.25A4.5 4.5 0 0015 7.5h-1.5m-3 0L9 9m0 0V3m-4.5 9h9.75M3 15h12.75M3 18h12.75M3 21h12.75" /></svg>,
  Messages: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12c.381 0 .755-.06.755-.06M8.625 12a4.5 4.5 0 01-4.5 4.5h15a4.5 4.5 0 01-4.5-4.5M8.625 12v1.5m0-1.5h-1.5m1.5 0H14.25m-1.5 0v1.5m0-1.5h1.5m-1.5 0V14.25m-1.5 0v1.5m0-1.5h1.5m-1.5 0H14.25" /></svg>,
  Leaderboard: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 10.5v-.5M18 10.5V10.5M12 6.75v-.5M12 6.75V6.75M6 14.25v-.5M6 14.25V14.25M10.5 4.5h3m-3 0v-.5M10.5 4.5V4.5M6 14.25h3m-3 0v-.5M6 14.25V14.25M18 10.5h3m-3 0v-.5M18 10.5V10.5M12 6.75h3m-3 0v-.5M12 6.75V6.75M10.5 14.25h3m-3 0v-.5M10.5 14.25V14.25" /></svg>,
  Settings: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18H9a6 6 0 01-6-6V9a6 6 0 016-6h1.5a6 6 0 016 6v1.5M10.5 18a6 6 0 016-6h1.5a6 6 0 016 6v1.5a6 6 0 01-6 6H10.5a6 6 0 01-6-6V18z" /></svg>,
};

const navigation = [
  { name: 'Dashboard', icon: 'Dashboard', current: true },
  { name: 'My Skills', icon: 'MySkills', current: false },
  { name: 'Requests', icon: 'Requests', current: false },
  { name: 'Messages', icon: 'Messages', current: false },
  { name: 'Leaderboard', icon: 'Leaderboard', current: false },
  { name: 'Settings', icon: 'Settings', current: false },
];

const Sidebar = () => {
  return (
    // Fixed position, sitting below the header (top-16), taking full remaining height
    <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-xl z-30">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const IconComponent = icons[item.icon];
          return (
            <a
              key={item.name}
              href="#"
              // Conditional styling based on 'current' state (Dashboard is active)
              className={
                item.current
                  ? 'bg-indigo-600 text-white font-medium flex items-center p-3 rounded-xl'
                  : 'text-gray-600 hover:bg-gray-100 flex items-center p-3 rounded-xl'
              }
            >
              {IconComponent && (
                <IconComponent
                  className={`h-6 w-6 mr-3 ${item.current ? 'text-white' : 'text-gray-500'}`}
                />
              )}
              {item.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;