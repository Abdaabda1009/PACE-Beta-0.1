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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThemeCard } from "@/components/settings/ThemeCard";
import { LanguageCard } from "@/components/settings/LanguageCard";
import { ChartStyleCard } from "@/components/settings/ChartStyleCard";
import { CookieCard } from "@/components/settings/CookieCard";

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
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [chartStyle, setChartStyle] = useState("default");
  const [cookieConsent, setCookieConsent] = useState(true);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your appearance settings have been updated successfully.",
    });
  };

  return (
    <div className="container max-w-6xl mx-auto p-1 space-y-4 ml-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
      </div>

      <Tabs
        defaultValue="account"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start gap-2 bg-dashboard-card p-2 rounded-xl h-auto flex-wrap">
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
          <TabsContent value="appearance" className="space-y-8">
            <div className="grid gap-8">
              <ThemeCard theme={theme} setTheme={setTheme} />
              <LanguageCard language={language} setLanguage={setLanguage} />
              <ChartStyleCard
                chartStyle={chartStyle}
                setChartStyle={setChartStyle}
              />
              <CookieCard
                cookieConsent={cookieConsent}
                setCookieConsent={setCookieConsent}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <p className="text-gray-400">
                Manage your account preferences and settings.
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
