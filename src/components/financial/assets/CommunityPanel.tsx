import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export const CommunityPanel = () => {
  return (
    <Card className="bg-dashboard-card border-gray-800 p-10 text-center">
      <div className="flex justify-center mb-6">
        <div className="relative inline-flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-full bg-gray-500 border-2 border-dashboard-card center"
              style={{
                left: `${(i - 1) * 28}px`,
                zIndex: 5 - i,
              }}
            />
          ))}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">
        Join Our Community
      </h3>
      <p className="text-gray-400 text-sm mb-8">
        Connect with traders and investors from around the world
      </p>
      <Button className="w-full bg-[#242837] bg-[#050524] hover:bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF]">
        <UserPlus className="w-5 h-5" />
        Join Now
      </Button>
    </Card>
  );
};