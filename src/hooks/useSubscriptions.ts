import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Subscription } from "@/types/subscription";
import { useQuery } from "@tanstack/react-query";

const fetchSubscriptions = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to view subscriptions");
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Transform the data to match our Subscription type
  const transformedData: Subscription[] = data.map((subscription) => ({
    id: subscription.id,
    name: subscription.name,
    amount: subscription.amount,
    next_payment_date: subscription.next_payment_date,
    date: subscription.next_payment_date,
    image_url: subscription.image_url,
    user_id: subscription.user_id,
    created_at: subscription.created_at,
    category: subscription.category || "other",
  }));

  return transformedData;
};

export const useSubscriptions = () => {
  const {
    data: subscriptions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subscriptions",
        variant: "destructive",
      });
    }
  }, [error]);

  return {
    subscriptions,
    isLoading,
    refetchSubscriptions: refetch,
  };
};
