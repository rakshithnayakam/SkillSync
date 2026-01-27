import React from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardContent from "../components/Dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <Sidebar />

      <main className="pt-16 pl-64 p-8">
        <DashboardContent />
      </main>
    </div>
  );
};

export default Dashboard;
