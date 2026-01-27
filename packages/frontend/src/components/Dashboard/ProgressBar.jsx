// src/components/DashboardComponents/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ label, current, total, color = 'bg-gray-800' }) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span className="text-green-600 font-semibold">{`${current}/${total}`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;