import React from 'react';

// --- Placeholder Icons (Definitions remain the same) ---
const ActiveMembersIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-8 h-8 md:w-10 md:h-10 text-white"
  >
    {/* People icon */}
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    {/* The additional person icon from the image is tricky with basic Lucide,
       but we approximate the visual: */}
    <path d="M21 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
    <path d="M22 17c0-2.2-2.24-4-5-4s-5 1.8-5 4v2h10z"/>
  </svg>
);

const SkillsIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-8 h-8 md:w-10 md:h-10 text-white"
  >
    {/* Book icon */}
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const ExchangesIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-8 h-8 md:w-10 md:h-10 text-white"
  >
    {/* Trophy icon */}
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"></path>
    <path d="M12 15V4"></path>
    <path d="M12 4h.01"></path>
  </svg>
);

const RatingIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-8 h-8 md:w-10 md:h-10 text-white"
  >
    {/* Star icon (outline) */}
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);


// --- 1. Data Structure ---
const statsData = [
  { 
    value: "15000+", 
    label: "Active Members", 
    Icon: ActiveMembersIcon 
  },
  { 
    value: "750+", 
    label: "Skills Available", 
    Icon: SkillsIcon 
  },
  { 
    value: "85000+", 
    label: "Exchanges Completed", 
    Icon: ExchangesIcon 
  },
  { 
    value: "4.9/5", 
    label: "Average Rating", 
    Icon: RatingIcon 
  },
];

// --- 2. Stat Item Sub-Component (FIXED) ---
const StatItem = ({ value, label, Icon }) => {
  return (
    <div className="flex flex-col items-center text-white p-4">
      {/* Icon Wrapper (Rounded box with subtle shadow/glow) */}
      <div 
        className="
          p-3 sm:p-4 
          rounded-xl 
          bg-white/20 
          backdrop-blur-sm 
          shadow-lg 
          mb-4
          flex items-center justify-center
        "
      >
        {Icon && <Icon />} 
      </div>

      {/* Statistic Value */}
      <p className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
        {value}
      </p>

      {/* Label */}
      <p className="text-sm sm:text-base opacity-90 text-center">
        {label}
      </p>
    </div>
  );
};


// --- 3. Main Component ---
const StatsBanner = () => {
  return (
    <div 
      className="
        w-full 
        py-10 
        md:py-16 
        flex 
        items-center 
        justify-center
        
        /* Gradient Background matching the image */
        bg-gradient-to-r 
        from-[#3a60a7] via-[#228b8b] to-[#45b77c]
        /* Using custom colors closer to the image, though standard Tailwind colors work */
      "
    >
      <div 
        className="
          max-w-7xl 
          mx-auto 
          px-4 
          sm:px-6 
          lg:px-8 
          w-full
        "
      >
        <div 
          className="
            grid 
            grid-cols-2 
            md:grid-cols-4 
            gap-4
          "
        >
          {statsData.map((stat) => (
            <StatItem 
              key={stat.label} 
              value={stat.value} 
              label={stat.label} 
              Icon={stat.Icon} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;