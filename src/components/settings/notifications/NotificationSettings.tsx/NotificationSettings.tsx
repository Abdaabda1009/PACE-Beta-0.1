import { EmailNotificationsCard } from "../EmailNotificationsCard";
import { SMSAlertsCard } from "../SMSAlertsCard";
import { PushNotificationsCard } from "../PushNotificationsCard";

export const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <EmailNotificationsCard />
        <SMSAlertsCard />
        <PushNotificationsCard />
      </div>
    </div>
  );
};
