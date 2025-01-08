import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
interface ActionButtonCTAProps {
  className?: string;
}
export const ActionButtonCTA = ({ className }: ActionButtonCTAProps) => {
  const navigate = useNavigate();
  return (
    <Button
      size="lg"
      className={cn(
        "bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto transition-all duration-300",
        className
      )}
      onClick={() => navigate("/login?view=sign_up")}
    >
      TRY IT OUT 
    </Button>
  );
};
