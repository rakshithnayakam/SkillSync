// src/components/DashboardComponents/UpcomingSessions.jsx
import React from 'react';
import { ClockIcon } from './Icons'; // Reusing Clock icon for schedule

const Calendar = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  // Simplified calendar dates for October 2025
  const dates = [
    { day: 28, inactive: true }, { day: 29, inactive: true }, { day: 30, inactive: true }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 },
    { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 },
    { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 },
    { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 },
    { day: 26 }, { day: 27 }, { day: 28 }, { day: 29, isCurrent: true, active: true }, { day: 30 }, { day: 31 }, { day: 1, inactive: true },
  ];

  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-4 text-gray-700">
        <button className="text-gray-400 hover:text-gray-600">{'<'}</button>
        <span className="font-semibold text-lg">October 2025</span>
        <button className="text-gray-400 hover:text-gray-600">{'>'}</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm font-medium mb-3 text-gray-500">
        {days.map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm">
        {dates.map((date, index) => (
          <div 
            key={index}
            className={`p-2 rounded-lg cursor-pointer ${
              date.inactive 
                ? 'text-gray-400' 
                : date.isCurrent 
                  ? 'bg-indigo-700 text-white font-bold' 
                  : date.active 
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleItem = ({ time, activity, user, color }) => (
    <div className="flex justify-between items-center p-3 border-b last:border-b-0">
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${color.bg}`}>
                <ClockIcon className={`w-5 h-5 ${color.text}`} />
            </div>
            <div>
                <p className="font-medium text-gray-800">{activity}</p>
                <p className="text-xs text-gray-500">with {user}</p>
            </div>
        </div>
        <span className="text-sm font-semibold text-gray-600">{time}</span>
    </div>
);

const UpcomingSessions = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Sessions</h2>
            
            <Calendar />

            <div className="mt-8 border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">Today's Schedule</h3>
                <ScheduleItem 
                    time="2:00 PM"
                    activity="Spanish Lesson"
                    user="Sarah Chen"
                    color={{ bg: 'bg-indigo-100', text: 'text-indigo-700' }}
                />
                <ScheduleItem 
                    time="4:30 PM"
                    activity="Guitar Practice"
                    user="Mike Johnson"
                    color={{ bg: 'bg-green-100', text: 'text-green-700' }}
                />
            </div>
        </div>
    );
};

export default UpcomingSessions;
