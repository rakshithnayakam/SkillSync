import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import WeeklyProgress from "./WeeklyProgress";
import RecommendedMatches from "./RecommendedMatches";
import RequestsOverview from "./RequestsOverview";
import YourProgress from "./YourProgress";
import RecentBadges from "./RecentBadges";
import UpcomingSessions from "./UpcomingSessions";

const DashboardContent = ({ user, progress }) => {
  return (
    <div className="space-y-8">
      <WelcomeBanner user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WeeklyProgress progress={progress} />
          <RecommendedMatches />
          <RequestsOverview />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <YourProgress progress={progress} />
          <RecentBadges />
          <UpcomingSessions />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
