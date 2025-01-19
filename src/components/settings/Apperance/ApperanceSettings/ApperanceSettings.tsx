import { ChartStyleCard } from "../ChartStyleCard";
import { CookieCard } from "../CookieCard";
import { LanguageCard } from "../LanguageCard";
import { ThemeCard } from "../ThemeCard";
import { useState } from "react";
export const AppearanceSettings = () => {
  const [chartStyle, setChartStyle] = useState("default");
  const [cookieConsent, setCookieConsent] = useState(false);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("system");
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <ThemeCard theme={theme} setTheme={setTheme} />
        <ChartStyleCard chartStyle={chartStyle} setChartStyle={setChartStyle} />
        <LanguageCard language={language} setLanguage={setLanguage} />
        <CookieCard
          cookieConsent={cookieConsent}
          setCookieConsent={setCookieConsent}
        />
      </div>
    </div>
  );
};
