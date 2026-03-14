import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";
import DashboardContent from "../components/Dashboard/DashboardContent.jsx";
import API from "../api/axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch user and progress at the same time
        const [userRes, progressRes] = await Promise.all([
          API.get("/auth/current-user"),
          API.get("/progress"),
        ]);
        setUser(userRes.data.data);
        setProgress(progressRes.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <DashboardContent user={user} progress={progress} />
      </main>
    </div>
  );
};

export default Dashboard;
