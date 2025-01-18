import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FeedbackAlertProps {
  type: "success" | "error";
  message: string;
}

export const FeedbackAlert = ({ type, message }: FeedbackAlertProps) => {
  if (type === "success") {
    return (
      <Alert className="mb-6 bg-dashboard-success/20 border-dashboard-success text-dashboard-success">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-6 bg-dashboard-error/20 border-dashboard-error">
      <AlertCircle className="h-4 w-4 text-dashboard-error" />
      <AlertDescription className="text-dashboard-error ml-2">
        {message}
      </AlertDescription>
    </Alert>
  );
};
