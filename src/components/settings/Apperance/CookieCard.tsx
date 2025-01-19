import { Cookie } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface CookieCardProps {
  cookieConsent: boolean;
  setCookieConsent: (consent: boolean) => void;
}
export const CookieCard = ({
  cookieConsent,
  setCookieConsent,
}: CookieCardProps) => {
  return (
    <Card className="p-6 bg-dashboard-card border-gray-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Cookie Preferences</h3>
          <p className="text-sm text-gray-400">
            Manage your cookie and tracking preferences
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCookieConsent(!cookieConsent)}
          className={`${cookieConsent ? "bg-blue-500/10 border-blue-500" : ""}`}
        >
          <Cookie className="w-4 h-4 mr-2" />
          {cookieConsent ? "Enabled" : "Disabled"}
        </Button>
      </div>
    </Card>
  );
};
