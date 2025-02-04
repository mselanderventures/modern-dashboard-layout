import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isLiveExperience = location.pathname === "/live";

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        showMessageButton={isLiveExperience}
      />
      <main className="flex-1 transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
};