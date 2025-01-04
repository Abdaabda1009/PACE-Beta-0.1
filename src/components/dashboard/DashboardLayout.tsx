import { DashboardSidebar } from "../DashboardSidebar";
import { TopNavBar } from "./TopNavBar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-dashboard-background text-white flex">
      <DashboardSidebar />
      <div className="flex-1">
        <TopNavBar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};