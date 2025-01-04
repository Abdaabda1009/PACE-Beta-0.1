import React, { useState } from "react";
import "./SubscriptionSummary.css";

interface Subscription {
  name: string;
  category: string;
  costPerMonth: number;
  costPerYear: number;
}

const subscriptions: Subscription[] = [
  {
    name: "Netflix",
    category: "Entertainment",
    costPerMonth: 100,
    costPerYear: 120,
  },
  {
    name: "Spotify",
    category: "Entertainment",
    costPerMonth: 59,
    costPerYear: 60,
  },
  {
    name: "Microsoft Office",
    category: "Productivity",
    costPerMonth: 150,
    costPerYear: 180,
  },
  {
    name: "Google Workspace",
    category: "Productivity",
    costPerMonth: 9,
    costPerYear: 108,
  },
];

const SubscriptionSummary: React.FC = () => {
  const [view, setView] = useState<"monthly" | "annual">("monthly");

  const calculateTotalCost = (view: "monthly" | "annual") => {
    return subscriptions.reduce((total, sub) => {
      return total + (view === "monthly" ? sub.costPerMonth : sub.costPerYear);
    }, 0);
  };

  const handleViewToggle = () => {
    setView(view === "monthly" ? "annual" : "monthly");
  };

  return (
    <div className="subscription-summary">
      <h1>Subscription Summary</h1>
      <button onClick={handleViewToggle}>
        Switch to {view === "monthly" ? "Annual" : "Monthly"} View
      </button>

      <div className="summary-view">
        <h2>{view} Overview</h2>
        <p>Total Spending: ${calculateTotalCost(view).toFixed(2)}</p>
        {/* Add more details here */}
      </div>
    </div>
  );
};

export default SubscriptionSummary;
