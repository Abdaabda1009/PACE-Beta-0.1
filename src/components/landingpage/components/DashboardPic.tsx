import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export const DashboardPic = () => {
  return (
    <div className="relative flex justify-center items-center w-full">
      <Card className="aspect-[20/10] bg-[#0A0118]/80 backdrop-blur-sm rounded-lg overflow-hidden border-purple-500/20 flex justify-center items-center">
        {/* Placeholder for Picture */}
        <div className="w-full max-w-[1200px] h-full max-h-[1200px] bg-gray-700 rounded-lg flex items-center justify-center">
          <img
            src="assets/dashboard.png"
            alt="Dashboard"
            className="w-full h-full object-fit rounded-lg"
          />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
          <button
            className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full bg-blue-500/20 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/30 transition-colors group"
            onClick={() => console.log("Play video")}
          >
            <Play className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-blue-200 group-hover:text-white transition-colors" />
          </button>
        </div>
      </Card>
    </div>
  );
};
