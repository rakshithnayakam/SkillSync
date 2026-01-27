// src/components/DashboardComponents/YourProgress.jsx
import React from 'react';

const YourProgress = () => {
  const progressPercent = 78;

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg opacity-80">Current Level</p>
          <span className="text-xl font-bold">2,450 XP</span>
        </div>
        <p className="text-4xl font-extrabold">Level 12</p>

        <div className="pt-4">
          <div className="flex justify-between items-center text-sm font-medium mb-1 opacity-80">
            <span>Progress to Level 13</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-indigo-500 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-white transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProgress;