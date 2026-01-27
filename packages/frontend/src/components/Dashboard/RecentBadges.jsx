// src/components/DashboardComponents/RecentBadges.jsx
import React from 'react';
import { ExpertTeacherIcon, QuickLearnerIcon, StarIcon, StreakMasterIcon } from './Icons';

const badges = [
  { label: 'Expert Teacher', icon: ExpertTeacherIcon, color: 'text-yellow-600 bg-yellow-100' },
  { label: 'Quick Learner', icon: QuickLearnerIcon, color: 'text-purple-600 bg-purple-100' },
  { label: '5-Star Rating', icon: StarIcon, color: 'text-blue-600 bg-blue-100' },
  { label: 'Streak Master', icon: StreakMasterIcon, color: 'text-orange-600 bg-orange-100' },
];

const BadgeItem = ({ badge }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className={`p-3 rounded-xl ${badge.color}`}>
      <badge.icon className="w-6 h-6" />
    </div>
    <p className="text-xs text-gray-600 font-medium text-center">{badge.label}</p>
  </div>
);

const RecentBadges = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Recent Badges</h2>
      <div className="grid grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <BadgeItem key={index} badge={badge} />
        ))}
      </div>
    </div>
  );
};

export default RecentBadges;