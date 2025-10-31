import React from 'react';
// For demo purposes, we define simple placeholder SVGs and Avatars.
// In a real app, you would use an icon library (e.g., Lucide, Heroicons) and image assets.

// --- Icon Placeholders ---
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 5.74"></path>
  </svg>
);
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500 rotate-180 hover:text-blue-600 transition-colors cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="7 13 12 18 17 13"></polyline>
    <line x1="12" y1="6" x2="12" y2="18"></line>
  </svg>
);

// Basic Avatar Placeholder Component
const Avatar = ({ emoji }) => (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl shadow-inner">
        {emoji}
    </div>
);

// --- 1. Data Structure ---
const exchangesData = [
  {
    id: 1,
    title: "Web Development ↔ Graphic Design",
    status: "Active",
    statusColor: "bg-purple-600",
    headerColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    metadata: { duration: "8 weeks", people: 2, tag: "Creative", tagColor: "bg-green-500 text-white" },
    users: [
      { name: "Alex Thompson", role: "Learning Design", emoji: "😥" },
      { name: "Maria Garcia", role: "Learning Code", emoji: "😎" },
    ],
  },
  {
    id: 2,
    title: "Spanish Language ↔ Piano Lessons",
    status: "Active",
    statusColor: "bg-green-600",
    headerColor: "bg-gradient-to-r from-emerald-500 to-green-600",
    metadata: { duration: "12 weeks", people: 2, tag: "Arts & Language", tagColor: "bg-teal-500 text-white" },
    users: [
      { name: "James Wilson", role: "Learning Spanish", emoji: "😁" },
      { name: "Sofia Rodriguez", role: "Learning Piano", emoji: "🥶" },
    ],
  },
  {
    id: 3,
    title: "Photography ↔ Digital Marketing",
    status: "Starting Soon",
    statusColor: "bg-pink-500",
    headerColor: "bg-gradient-to-r from-orange-500 to-pink-500",
    metadata: { duration: "6 weeks", people: 2, tag: "Business & Creative", tagColor: "bg-emerald-600 text-white" },
    users: [
      { name: "Emma Davis", role: "Learning Marketing", emoji: "😊" },
      { name: "Ryan Chen", role: "Learning Photography", emoji: "😒" },
    ],
  },
];

// --- 2. Sub-Components ---

const UserProfile = ({ name, role, emoji, isFirst }) => (
    <div className={`flex items-center gap-4 ${isFirst ? 'mb-4' : ''}`}>
        <Avatar emoji={emoji} />
        <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
        </div>
    </div>
);

const ExchangeCard = ({ data }) => {
  return (
    <div 
      className="
        bg-white 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        border border-gray-100
        flex flex-col
      "
    >
      {/* Header Section (Gradient) */}
      <div className={`p-6 text-white relative ${data.headerColor}`}>
        <h3 className="text-lg font-semibold">{data.title}</h3>
        
        {/* Status Badge */}
        <span 
          className={`
            absolute top-4 right-4 
            px-3 py-1 text-xs font-medium 
            rounded-full 
            ${data.statusColor} 
            bg-opacity-90
            shadow-md
          `}
        >
          {data.status}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* User Profiles */}
        <div className="flex flex-col">
            <UserProfile {...data.users[0]} isFirst={true} />
            
            {/* Divider Icon */}
            <div className="flex justify-center my-2">
                <ArrowDownIcon />
            </div>

            <UserProfile {...data.users[1]} isFirst={false} />
        </div>

        {/* Metadata and Tag */}
        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          
          {/* Left: Duration */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ClockIcon />
              <span className="ml-1.5 font-medium text-gray-700">{data.metadata.duration}</span>
            </div>
            
            {/* Tag */}
            <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${data.metadata.tagColor}`}>
              {data.metadata.tag}
            </span>
          </div>

          {/* Right: People Count */}
          <div className="flex items-center">
            <UsersIcon />
            <span className="ml-1.5 font-medium text-gray-700">{data.metadata.people} people</span>
          </div>
        </div>

      </div>
    </div>
  );
};


// --- 3. Main Component ---
const PopularExchanges = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Text */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Popular Skill Exchanges
          </h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            See what our community is learning and teaching right now. Get inspired by these active skill exchanges.
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          className="
            grid 
            grid-cols-1 
            md:grid-cols-3 
            gap-8
          "
        >
          {exchangesData.map((exchange) => (
            <ExchangeCard key={exchange.id} data={exchange} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-12 pt-6">
          <a 
            href="/all-exchanges" 
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-150 border-b border-blue-600 border-opacity-0 hover:border-opacity-100"
          >
            View All Active Exchanges →
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopularExchanges;