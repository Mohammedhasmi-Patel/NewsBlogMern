import React from "react";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <aside className="h-screen w-64 bg-slate-200 text-slate-800 flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <Link
            to="/dashboard?tab=profile"
            className="flex items-center p-2 hover:bg-slate-300 rounded"
          >
            <FaUserAlt className="mr-3" />
            <span>Profile</span>
          </Link>
        </ul>

        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center w-full p-2 hover:bg-slate-300 rounded">
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
