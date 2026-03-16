import React from "react";
import { ClockIcon, CheckCircleIcon, StatusIcon } from "./Icons";

const RequestCard = ({ count, label, icon, color }) => (
  <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 dark:bg-gray-800 rounded-lg text-center">
    <div className={`p-3 rounded-full ${color.bg} mb-3`}>
      {React.createElement(icon, { className: `w-8 h-8 ${color.text}` })}
    </div>
    <p className="text-3xl font-bold text-primary">{count}</p>
    <p className="text-sm text-muted">{label}</p>
  </div>
);

const RequestsOverview = ({ requests }) => {
  const pending = requests?.filter((r) => r.status === "pending").length || 0;
  const accepted = requests?.filter((r) => r.status === "accepted").length || 0;
  const completed =
    requests?.filter((r) => r.status === "completed").length || 0;

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-primary mb-5">
        Requests Overview
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <RequestCard
          count={pending}
          label="Pending"
          icon={ClockIcon}
          color={{ bg: "bg-orange-100", text: "text-orange-600" }}
        />
        <RequestCard
          count={accepted}
          label="Accepted"
          icon={CheckCircleIcon}
          color={{ bg: "bg-green-100", text: "text-green-600" }}
        />
        <RequestCard
          count={completed}
          label="Completed"
          icon={StatusIcon}
          color={{ bg: "bg-indigo-100", text: "text-indigo-600" }}
        />
      </div>
    </div>
  );
};

export default RequestsOverview;
