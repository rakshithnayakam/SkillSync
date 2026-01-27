// src/components/DashboardComponents/RecommendedMatches.jsx
import React from 'react';
import { ArrowRightIcon } from './Icons';

const matches = [
  { name: 'Sarah Chen', teaches: 'Spanish', learns: 'Guitar', match: 95, avatar: 'https://via.placeholder.com/150/f97316/ffffff?text=SC' },
  { name: 'Mike Johnson', teaches: 'Photography', learns: 'Web Design', match: 88, avatar: 'https://via.placeholder.com/150/10b981/ffffff?text=MJ' },
  { name: 'Emma Davis', teaches: 'Yoga', learns: 'Cooking', match: 82, avatar: 'https://via.placeholder.com/150/6366f1/ffffff?text=ED' },
];

const MatchItem = ({ match }) => (
  <div className="flex items-center justify-between p-3 border-b last:border-b-0">
    <div className="flex items-center space-x-3">
      <img src={match.avatar} alt={match.name} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="font-medium text-gray-800">{match.name}</p>
        <p className="text-sm text-gray-500">
          Teaches: {match.teaches} • Learns: {match.learns}
        </p>
      </div>
    </div>
    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
      {match.match}% Match
    </span>
  </div>
);

const RecommendedMatches = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recommended Matches</h2>
        <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View All <ArrowRightIcon className="w-4 h-4 ml-1" />
        </a>
      </div>
      <div className="divide-y divide-gray-100">
        {matches.map((match) => (
          <MatchItem key={match.name} match={match} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedMatches;