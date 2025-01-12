import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SubscriptionItem } from "@/components/subscriptions/SubscriptionItem";
import { MoreVertical, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddSubscriptionDialog } from "@/components/subscriptions/AddSubscriptionDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryFilter } from "@/components/subscriptions/filters/CategoryFilter";
import { SUBSCRIPTION_CATEGORIES } from "../subscriptions/filters/constants";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  date: string;
  image_url?: string;
  category: string;
  frequency?: string;
  email?: string;
}

interface SubscriptionOverviewProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
  onEditSubscription: (subscription: Subscription) => void;
  onSubscriptionUpdated: () => void;
}

export const SubscriptionOverview = ({
  subscriptions,
  isLoading,
  onEditSubscription,
  onSubscriptionUpdated,
}: SubscriptionOverviewProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/subscriptions");
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    activeFilter === "all"
      ? true
      : (sub.category?.toLowerCase() || "other") === activeFilter
  );

  const renderSkeletonItems = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="col-span-4 bg-dashboard-card px-8 py-6 rounded-xl border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-[44px] w-[44px] rounded" />
            <Skeleton className="h-[44px] w-[44px] rounded" />
          </div>
        </div>
        {renderSkeletonItems()}
      </div>
    );
  }

  return (
    <div className="col-span-4 bg-dashboard-card px-8 py-6 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[24px] font-semibold text-white">
            Subscription tracker
          </h2>
          <p className="text-[14px] text-gray-400">
            Monitor all your active subscriptions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-[44px] h-[44px] p-[10px] text-gray-400 hover:text-white bg-[#242837]"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-[44px] h-[44px] p-[10px] text-gray-400 hover:text-white bg-[#242837]"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#1A1F2C] border-gray-800"
            >
              <DropdownMenuItem
                className="text-gray-400 hover:text-white focus:text-white cursor-pointer"
                onClick={handleViewAll}
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View All</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CategoryFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="divide-y divide-gray-800">
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map((sub) => (
            <SubscriptionItem
              key={sub.id}
              id={sub.id}
              name={sub.name}
              image={sub.image_url || ""}
              amount={sub.amount}
              date={sub.date}
              category={sub.category}
              frequency={sub.frequency}
              email= {sub.email}
              onEdit={() => onEditSubscription(sub)}
              onSubscriptionDeleted={onSubscriptionUpdated}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            {activeFilter === "all"
              ? "No subscriptions yet. Click the Add button to create your first entry!"
              : `No ${activeFilter} subscriptions found.`}
          </div>
        )}
      </div>
      <AddSubscriptionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubscriptionAdded={onSubscriptionUpdated}
      />
    </div>
  );
};