import { TwoFactorCard } from "../TwoFactorCard";
import { SecurityQuestionsCard } from "../SecurityQuestionsCard";
import { DeviceManagementCard } from "../DeviceManagementCard";
import { SecurityAlertsCard } from "../SecurityAlertsCard";
export const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <TwoFactorCard />
        <SecurityQuestionsCard />
        <DeviceManagementCard />
        <SecurityAlertsCard />
      </div>
    </div>
  );
};
