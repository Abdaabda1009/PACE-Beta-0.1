import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <main className=" grid grid-cols-1 lg:grid-cols-2  gap-32 items-center space-x-32">
      <div className="space-y-32">
        <div className="space-y-4">
          <h1 className="text-4x1 md:text-5xl lg:text-6xl mt-auto font-bold text-white leading-tight">
            Your Financial Dashboard, Simplified
          </h1>
          <p className="text-xl italic text-gray-500">
            Plan, Allocate, Control, and Earn 
            empowers users with AI-driven insights, facilitating smarter
            financial decisions.
          </p>
        </div>
        <div className="flex items-center gap-4 ">
          <Button
            size="lg"
            className="text-whithe w-[274px] h-[47px] px-8 py-3 bg-[#18799f] hover:bg-blue-500 hover:text-dashboard-background rounded-3xl justify-center items-center gap-2.5 inline-flex"
            onClick={() => navigate("/login")}
          >
            TRY IT FREE
          </Button>
          <span className="text-sm text-dashboard-muted pointer-events-none animate-gradient">
            Beta 1.0
          </span>
        </div>
      </div>

      <div className="hidden lg:block relative">
        <div className="aspect-square rounded-lg  backdrop-blur-sm p-8">
          <div className="absolute inset-0 opacity-100">
            <img
              src="/assets/logoicon.png"
              alt=""
              className="w-full h-full object-fill"
            />
          </div>
        </div>
      </div>
    </main>
  );
};