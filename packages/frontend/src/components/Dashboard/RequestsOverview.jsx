// src/components/DashboardComponents/RequestsOverview.jsx
import React from 'react';
import { ClockIcon, CheckCircleIcon, StatusIcon } from './Icons';

const RequestCard = ({ count, label, icon, color }) => (
  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center shadow-inner">
    <div className={`p-3 rounded-full ${color.bg} mb-3`}>
      {React.createElement(icon, { className: `w-8 h-8 ${color.text}` })}
    </div>
    <p className="text-3xl font-bold text-gray-900">{count}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const RequestsOverview = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Requests Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <RequestCard
          count={5}
          label="Pending"
          icon={ClockIcon}
          color={{ bg: 'bg-orange-100', text: 'text-orange-600' }}
        />
        <RequestCard
          count={12}
          label="Accepted"
          icon={CheckCircleIcon}
          color={{ bg: 'bg-green-100', text: 'text-green-600' }}
        />
        <RequestCard
          count={28}
          label="Completed"
          icon={StatusIcon}
          color={{ bg: 'bg-indigo-100', text: 'text-indigo-600' }}
        />
      </div>
    </div>
  );
};

export default RequestsOverview;