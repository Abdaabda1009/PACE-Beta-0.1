import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Landing } from "./pages/Landing";
import Login from "./pages/Login";
import { MainDashboard } from "./components/dashboard/MainDashboard";
import { BudgetPlanner } from "./pages/budgetplanner";
import { AnalysisGoals } from "./pages/AnalysisGoals";
import { DebtManagement } from "./pages/DebtManagement";
import { Subscriptions } from "./pages/Subscriptions";
import { AssetsManagement } from "./pages/AssetsManagement";
import { Transactions } from "./pages/Transactions";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Support } from "./pages/Support";
import { ROUTES } from "./lib/constants";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-dashboard-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route to Landing */}
          <Route path="/" element={<Landing />} />

          {/* Login page */}
          <Route path={ROUTES.LOGIN} element={<Login />} />

          {/* Protected routes for the dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MainDashboard />} />
            <Route path="budget-planner" element={<BudgetPlanner />} />
            <Route path="analysis-goals" element={<AnalysisGoals />} />
            <Route path="debt-management" element={<DebtManagement />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="assets-management" element={<AssetsManagement />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Route>

          {/* Catch-all route redirects to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
