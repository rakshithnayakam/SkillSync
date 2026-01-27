import React from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";
import DashboardContent from "../components/Dashboard/DashboardContent.jsx";

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
