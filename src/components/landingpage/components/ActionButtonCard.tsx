import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export const ActionButtonCard = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 rounded-xl bg-dashboard-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl ml-12 font-bold text-white leading-tight">
              Your Financial Dashboard, Simplified
            </h2>
            <p className="text-lg ml-12 text-dashboard-muted mb-16">
              Perform essential financial actions with just a tap{" "}
            </p>
            <Button
              size="lg"
              className="bg-blue-600 ml-12 hover:bg-blue-700 text-white"
              onClick={() => navigate("/login?view=sign_up")}
            >
              Try It Out
            </Button>
          </div>
          <div className="relative">
            <div className="w-full max-w-md mx-auto transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <img
                src="/assets/dashboard.png"
                alt="Credit Card"
                className="w-full h-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
