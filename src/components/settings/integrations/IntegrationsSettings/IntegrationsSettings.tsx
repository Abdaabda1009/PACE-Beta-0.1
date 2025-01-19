import { BankAccountsCard } from "../BankAccountsCard";
import { ConnectedAppsCard } from "../ConnectedAppsCard";
export const IntegrationsSettings = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <BankAccountsCard />
        <ConnectedAppsCard />
      </div>
    </div>
  );
};
