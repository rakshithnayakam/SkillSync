import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import WeeklyProgress from "./WeeklyProgress";
import RecommendedMatches from "./RecommendedMatches";
import RequestsOverview from "./RequestsOverview";
import YourProgress from "./YourProgress";
import RecentBadges from "./RecentBadges";
import UpcomingSessions from "./UpcomingSessions";

const DashboardContent = ({ user, progress, requests }) => (
  <div className="space-y-6">
    <WelcomeBanner user={user} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left — main col */}
      <div className="lg:col-span-2 space-y-6">
        <WeeklyProgress progress={progress} />
        <RecommendedMatches />
        <RequestsOverview requests={requests} />
      </div>
      {/* Right — sidebar col */}
      <div className="lg:col-span-1 space-y-6">
        <YourProgress progress={progress} />
        <RecentBadges />
        <UpcomingSessions />
      </div>
    </div>
  </div>
);

export default DashboardContent;
