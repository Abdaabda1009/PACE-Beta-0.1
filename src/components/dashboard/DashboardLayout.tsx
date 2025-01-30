import { DashboardSidebar } from "@/components/dashboard/Sidebar/DashboardSidebar";
import { TopNavBar } from "./TopNavBar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-rgb(59 130 246 / 0.5) text-white flex">
      <DashboardSidebar />
      <div className="flex-1">
        <TopNavBar />
        <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </div>
      </div>
  );
};
