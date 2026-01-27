// src/components/DashboardComponents/DashboardContent.jsx
import React from 'react';

// Import all sub-components
import WelcomeBanner from './WelcomeBanner';
import WeeklyProgress from './WeeklyProgress';
import RecommendedMatches from './RecommendedMatches';
import RequestsOverview from './RequestsOverview';
import YourProgress from './YourProgress';
import RecentBadges from './RecentBadges';
import UpcomingSessions from './UpcomingSessions';

const DashboardContent = () => {
  return (
    <div className="space-y-8">
      {/* 1. Full-width Header Banner */}
      <WelcomeBanner />

      {/* 2. Main Grid Layout (2/3 content + 1/3 sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (2/3 Width) */}
        <div className="lg:col-span-2 space-y-8">
          <WeeklyProgress />
          <RecommendedMatches />
          <RequestsOverview />
        </div>
        
        {/* RIGHT COLUMN (1/3 Width) */}
        <div className="lg:col-span-1 space-y-8">
          <YourProgress />
          <RecentBadges />
          <UpcomingSessions />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;