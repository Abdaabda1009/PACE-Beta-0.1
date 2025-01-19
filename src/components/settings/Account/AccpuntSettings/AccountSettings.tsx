import { EmailUpdateCard } from "../EmailUpdateCard";
import { PasswordChangeCard } from "../PasswordChangeCard";
import { AccountDeletionCard } from "../AccountDeletionCard";
import { PhoneNumberCard } from "../PhoneNumberCard";
export const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <EmailUpdateCard />
        <PhoneNumberCard />
        <PasswordChangeCard />
        <AccountDeletionCard />
      </div>
    </div>
  );
};
