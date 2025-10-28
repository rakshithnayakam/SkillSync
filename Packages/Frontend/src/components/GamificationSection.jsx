import React from 'react';

// --- Icon Placeholders (Custom SVGs based on image) ---

// Used in the top stats cards
const LightningIcon = ({ className = 'text-blue-500' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);
const BadgeIcon = ({ className = 'text-blue-500' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);
const CrownIcon = ({ className = 'text-blue-500' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 6L14 3 20 3 20 6"></path>
        <path d="M4 6L4 3 10 3 10 6"></path>
        <path d="M12 18s6-3 6-9H6s0 6 6 9z"></path>
        <path d="M12 21L12 18"></path>
    </svg>
);

// Used in achievement badges
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2V7a3 3 0 10-6 0v2h6z" clipRule="evenodd" />
    </svg>
);


// --- 1. Data Structures (FIXED: BgIcon is now capitalized) ---

const statsData = [
    { 
        title: "Skill Points", 
        value: "2,450", 
        iconColor: 'text-blue-500', 
        BgIcon: LightningIcon
    },
    { 
        title: "Badges Earned", 
        value: "12", 
        iconColor: 'text-blue-500', 
        BgIcon: BadgeIcon
    },
    { 
        title: "Level", 
        value: "Gold", 
        iconColor: 'text-yellow-500', 
        BgIcon: CrownIcon
    },
];

const achievementsData = [
    // Completed Achievements
    {
        name: "First Exchange",
        description: "Complete your first skill exchange",
        iconBg: "bg-blue-600",
        icon: BadgeIcon,
        iconColor: "text-white",
        completed: true,
    },
    {
        name: "Quick Learner",
        description: "Complete 5 learning sessions",
        iconBg: "bg-yellow-500",
        icon: LightningIcon,
        iconColor: "text-white",
        completed: true,
    },
    {
        name: "Goal Crusher",
        description: "Achieve your learning goals",
        iconBg: "bg-green-600",
        icon: ({ className }) => ( // Custom icon for Goal Crusher
             <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
            </svg>
        ),
        iconColor: "text-white",
        completed: true,
    },
    // Locked Achievements
    {
        name: "Master Mentor",
        description: "Teach 10+ different students",
        iconBg: "bg-gray-700",
        icon: CrownIcon,
        iconColor: "text-white",
        completed: false,
    },
    {
        name: "Rising Star",
        description: "Get 5-star ratings consistently",
        iconBg: "bg-gray-700",
        icon: ({ className }) => ( // Custom icon for Rising Star (Chart)
            <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8.3L12 15 7.5 10.5 3 15"></path>
            </svg>
        ),
        iconColor: "text-white",
        completed: false,
    },
    {
        name: "Community Hero",
        description: "Help 50+ community members",
        iconBg: "bg-gray-700",
        icon: ({ className }) => ( // Custom icon for Community Hero (Sparkle)
            <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20.94l-6.94 1.83 1.83-6.94-6.94-1.83 6.94-1.83 1.83-6.94 6.94 1.83-1.83 6.94 6.94 1.83z"></path>
            </svg>
        ),
        iconColor: "text-white",
        completed: false,
    },
];

// --- 2. Stat Card Component (Top Row) ---
// FIXED: Destructuring updated to use BgIcon directly
const StatCard = ({ title, value, iconColor, BgIcon }) => (
    <div className="relative p-6 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        
        {/* Large Faded Background Icon */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4">
            {BgIcon && <BgIcon className="w-24 h-24 text-gray-200 opacity-70" />}
        </div>

        {/* Icon */}
        {BgIcon && <BgIcon className={`w-8 h-8 ${iconColor}`} />}

        {/* Value and Title */}
        <p className={`mt-3 text-2xl font-semibold ${iconColor === 'text-yellow-500' ? 'text-gray-800' : 'text-blue-600'}`}>
            {value}
        </p>
        <p className="text-sm text-gray-500">{title}</p>
    </div>
);

// --- 3. Achievement Card Component (Bottom Rows) ---
const AchievementCard = ({ name, description, icon: Icon, iconBg, iconColor, completed }) => (
    <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        
        {/* Status Badge (Completed or Locked) */}
        <div 
            className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center 
                        ${completed ? 'bg-green-500' : 'bg-gray-200'}`}
        >
            {completed ? <CheckIcon /> : <LockIcon />}
        </div>

        {/* Icon Circle */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} mb-3`}>
            {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
        </div>

        {/* Content */}
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
);

// --- 4. Main Component ---
const GamificationSection = () => {
    // Separate achievements into completed and locked for display order
    const completedAchievements = achievementsData.filter(a => a.completed);
    const lockedAchievements = achievementsData.filter(a => !a.completed);

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Earn Rewards as You Learn
                    </h2>
                    <p className="text-md text-gray-600 max-w-2xl mx-auto">
                        Stay motivated with our gamification system. Earn badges, collect points, and level up as you exchange skills and help others grow.
                    </p>
                </div>

                {/* Top Row: Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {statsData.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>

                {/* Achievement Header */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Unlock Achievements
                    </h3>
                </div>

                {/* Bottom Rows: Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Row 1: Completed Achievements */}
                    {completedAchievements.map((achievement, index) => (
                        <AchievementCard key={index} {...achievement} />
                    ))}
                    
                    {/* Row 2: Locked Achievements */}
                    {lockedAchievements.map((achievement, index) => (
                        <AchievementCard key={index} {...achievement} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamificationSection;