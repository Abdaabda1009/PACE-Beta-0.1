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
        "w-[300px] mt-8 bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200 rounded-full",
        className
      )}
      onClick={() => navigate("/login?view=sign_up")}
    >
      TRY IT OUT
    </Button>
  );
};
