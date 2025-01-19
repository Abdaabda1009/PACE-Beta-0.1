import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  User,
  Shield,
  Palette,
  Bell,
  CreditCard,
  Link2,
  Settings as SettingsIcon,
} from "lucide-react";
import { AccountSettings } from "@/components/settings/Account/AccpuntSettings/AccountSettings";
import { ProfileSettings } from "@/components/settings/profile/ProfileSettings/ProfileSettings";
import { AppearanceSettings } from "@/components/settings/Apperance/ApperanceSettings/ApperanceSettings";
import { SecuritySettings } from "@/components/settings/security/SecuritySettings/SecuritySettings";
import { NotificationSettings } from "@/components/settings/notifications/NotificationSettings.tsx/NotificationSettings";
import { BillingSettings } from "@/components/settings/billing/BillingSettings/BillingSettings";
import { IntegrationsSettings } from "@/components/settings/integrations/IntegrationsSettings/IntegrationsSettings";
 

const settingsTabs = [
  { id: "account", label: "Account", icon: User },
  { id: "profile", label: "Profile", icon: SettingsIcon },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Link2 },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="container max-w-6xl mx-auto p-2 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
      </div>

      <Tabs
        defaultValue="account"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start gap-2 bg-dashboard-card p-2 rounded-xl h-auto flex-wrap ">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-blue-600"
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-8">
          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>

          <TabsContent value="notifications">
              < NotificationSettings />
          </TabsContent>

          <TabsContent value="billing">
            < BillingSettings />
          </TabsContent>

          <TabsContent value="integrations">
            < IntegrationsSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
