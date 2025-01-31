import { GoalsCard } from "@/components/goals/GoalsCard";


export const Goals = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white"> Goals</h1>
      <div className="md:grid-cols-2 gap-6">
        <GoalsCard />
      </div>
    </div>
  );
};
