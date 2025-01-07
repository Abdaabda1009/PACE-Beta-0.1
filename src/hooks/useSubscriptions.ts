import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Subscription } from "@/types/subscription";

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to view subscriptions",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to match our Subscription type
      const transformedData = data.map((subscription) => ({
        id: subscription.id,
        name: subscription.name,
        amount: subscription.amount,
        next_payment_date: subscription.next_payment_date,
        date: subscription.next_payment_date,
        image_url: subscription.image_url,
      }));

      setSubscriptions(transformedData);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch subscriptions, please let us know the issue!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return {
    subscriptions,
    isLoading,
    refetchSubscriptions: fetchSubscriptions,
  };
};
