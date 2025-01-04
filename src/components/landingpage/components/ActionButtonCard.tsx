import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export const ActionButtonCard = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-dashboard-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Your Financial Dashboard, Simplified
            </h2>
            <p className="text-lg text-dashboard-muted mb-16">
              Perform essential financial actions with just a tap{" "}
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/login?view=sign_up")}
            >
              Open an Account
            </Button>
          </div>
          <div className="relative">
            <div className="w-full max-w-md mx-auto transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <img
                src="/lovable-uploads/59a1d742-7f24-4c97-99ae-842ed1ada00c.png"
                alt="Credit Card"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
