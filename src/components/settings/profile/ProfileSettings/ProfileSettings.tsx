import { ProfilePictureCard } from "../ProfilePictureCard";
import { DisplayNameCard } from "../DisplayNameCard";
import { BioCard } from "../BioCard";
import { TimeZoneCard } from "../TimeZoneCard";

export const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <ProfilePictureCard />
        <DisplayNameCard />
        <BioCard />
        <TimeZoneCard />
      </div>
    </div>
  );
};
