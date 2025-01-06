import { Bell, LogOut, Mail, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrencySelector } from "@/components/CurrencySelector";

export const TopNavBar = () => {
  const [bellCount, setBellCount] = useState(3);
  const [mailCount, setMailCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/budget-planner':
        return 'Budget Planner';
      default:
        return 'Dashboard';
    }
  };

  const getRandomCount = () => Math.floor(Math.random() * 10);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/Landing');
  };

  return (
    <div className="flex items-center justify-between w-full bg-dashboard-background p-4 border-b border-dashboard-card">
      <div className="flex flex-col">
      </div>
      <div className="flex items-center gap-2">
        <CurrencySelector />
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search"
            className="w-[300px] bg-dashboard-card text-white border-none pl-10"
          />
          <Search className="absolute left-3 h-4 w-4 text-dashboard-muted" />
          <Button 
            variant="secondary"
            size="sm"
            className="absolute right-1 bg-dashboard-card hover:bg-dashboard-card/80"
          >
            Submit
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-dashboard-card"
            onClick={() => setBellCount(getRandomCount())}
          >
            <Bell className="h-5 w-5 text-dashboard-muted" />
            {bellCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-dashboard-error text-[10px] flex items-center justify-center text-white">
                {bellCount}
              </span>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-dashboard-card"
            onClick={() => setMailCount(getRandomCount())}
          >
            <Mail className="h-5 w-5 text-dashboard-muted" />
            {mailCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-dashboard-error text-[10px] flex items-center justify-center text-white">
                {mailCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-dashboard-card"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 text-dashboard-muted" />
          </Button>
        </div>
      </div>
    </div>
  );
};