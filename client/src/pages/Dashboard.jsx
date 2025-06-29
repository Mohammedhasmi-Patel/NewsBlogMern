import BottomNavbar from "@/components/shared/BottomNavbar";
import DashboardProfile from "@/components/shared/DashboardProfile";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row w-full">
        {/* sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>
      </div>

      <BottomNavbar />

      <div>{tab == "profile" && <DashboardProfile />}</div>
    </div>
  );
};

export default Dashboard;
