import React from 'react';
// Note: In a real application, replace the iconPlaceholders 
// with actual imported SVG components (e.g., from Heroicons or Lucide).

// --- 1. Data Structure ---
const categoriesData = [
  { 
    name: "Programming", 
    count: "120+", 
    color: "bg-blue-500", 
    iconPlaceholder: "<>", // Placeholder for code icon
    iconBgColor: "bg-blue-100" 
  },
  { 
    name: "Design", 
    count: "85+", 
    color: "bg-purple-500", 
    iconPlaceholder: "♁", // Placeholder for design icon
    iconBgColor: "bg-purple-100" 
  },
  { 
    name: "Music", 
    count: "65+", 
    color: "bg-pink-500", 
    iconPlaceholder: "♫", // Placeholder for music note
    iconBgColor: "bg-pink-100" 
  },
  { 
    name: "Photography", 
    count: "45+", 
    color: "bg-indigo-500", 
    iconPlaceholder: "📷", // Placeholder for camera
    iconBgColor: "bg-indigo-100" 
  },
  { 
    name: "Languages", 
    count: "50+", 
    color: "bg-green-500", 
    iconPlaceholder: "文", // Placeholder for language/text
    iconBgColor: "bg-green-100" 
  },
  { 
    name: "Business", 
    count: "95+", 
    color: "bg-orange-500", 
    iconPlaceholder: "📈", // Placeholder for business chart
    iconBgColor: "bg-orange-100" 
  },
  { 
    name: "Fitness", 
    count: "40+", 
    color: "bg-red-500", 
    iconPlaceholder: "➶", // Placeholder for fitness/movement
    iconBgColor: "bg-red-100" 
  },
  { 
    name: "Cooking", 
    count: "55+", 
    color: "bg-yellow-500", 
    iconPlaceholder: "🍴", // Placeholder for cooking utensils
    iconBgColor: "bg-yellow-100" 
  },
  { 
    name: "Marketing", 
    count: "70+", 
    color: "bg-cyan-500", 
    iconPlaceholder: "💼", // Placeholder for briefcase/marketing
    iconBgColor: "bg-cyan-100" 
  },
  { 
    name: "Wellness", 
    count: "35+", 
    color: "bg-rose-500", 
    iconPlaceholder: "♡", // Placeholder for heart/wellness
    iconBgColor: "bg-rose-100" 
  },
  { 
    name: "Public Speaking", 
    count: "30+", 
    color: "bg-violet-500", 
    iconPlaceholder: "🎙", // Placeholder for microphone
    iconBgColor: "bg-violet-100" 
  },
  { 
    name: "DIY & Crafts", 
    count: "60+", 
    color: "bg-teal-500", 
    iconPlaceholder: "🛠", // Placeholder for tools/DIY
    iconBgColor: "bg-teal-100" 
  },
];

// --- 2. Skill Card Sub-Component ---
const SkillCard = ({ name, count, color, iconPlaceholder }) => {
  return (
    <div 
      className="
        p-4 sm:p-6 
        bg-white 
        rounded-xl 
        shadow-sm 
        border border-gray-100 
        transition 
        duration-300 
        hover:shadow-lg 
        cursor-pointer
      "
    >
      {/* Icon Container (The colored square) */}
      <div 
        className={`
          w-14 h-14 
          rounded-xl 
          flex items-center justify-center 
          mb-4 
          ${color}
        `}
      >
        {/* Icon Placeholder */}
        <span className="text-white text-2xl font-semibold leading-none">
          {iconPlaceholder}
        </span>
      </div>

      {/* Text Content */}
      <p className="text-lg font-semibold text-gray-800 mt-2">{name}</p>
      <p className="text-sm text-gray-500">{count} skills</p>
    </div>
  );
};


// --- 3. Main Component ---
const ExploreSkills = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Skills
          </h1>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Discover hundreds of skills across diverse categories. Find your passion and connect with experts ready to share their knowledge.
          </p>
        </div>

        {/* Categories Grid */}
        <div 
          className="
            grid 
            grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-4 
            sm:gap-6 
            xl:gap-8
          "
        >
          {categoriesData.map((category) => (
            <SkillCard
              key={category.name}
              name={category.name}
              count={category.count}
              color={category.color}
              iconPlaceholder={category.iconPlaceholder}
            />
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-12 pt-6">
          <a 
            href="/all-categories" 
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
          >
            View All Categories →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExploreSkills;