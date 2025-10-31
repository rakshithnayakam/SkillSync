import React from 'react';
import DashboardNavbar from '../DashboardComponents/DashboardNavbar';
import Sidebar from '../DashboardComponents/Sidebar';

const Dashboard = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Fixed Header */}
      <DashboardNavbar />

      {/* 2. Fixed Sidebar */}
      <Sidebar />

      {/* 3. Main Content Area */}
      {/* We use pt-16 (for Navbar height) and pl-64 (for Sidebar width) 
          to push the content into the correct visible area. */}
      <main className="pt-16 pl-64 p-8">
        {/* Placeholder content for the main dashboard view */}
        <div className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to the Dashboard!
        </div>
        <div className="h-[200vh] bg-white rounded-lg p-6 shadow-md">
            {/* The main content area where data/charts would go. */}
            <p className="text-gray-600">
                This space represents the main content of your application. 
                Scroll down to see the fixed navbar and sidebar remain in place.
            </p>
        </div>
        {children}
      </main>
    </div>
  );
};

// To run this example, replace the content of your App.js with this component:
export default Dashboard;