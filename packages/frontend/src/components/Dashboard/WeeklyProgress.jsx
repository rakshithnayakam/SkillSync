import React from "react";
import ProgressBar from "./ProgressBar";

const WeeklyProgress = ({ progress }) => {
  const weeklyHours = progress?.weeklyHours || 0;
  const weeklySessions = progress?.weeklySessions || 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Weekly Progress</h2>
        <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
          This Week
        </span>
      </div>
      <div className="space-y-6">
        <ProgressBar
          label="Session Hours"
          current={weeklyHours}
          total={15}
          color="bg-gray-800"
        />
        <ProgressBar
          label="Sessions Completed"
          current={weeklySessions}
          total={5}
          color="bg-gray-800"
        />
      </div>
    </div>
  );
};

export default WeeklyProgress;
