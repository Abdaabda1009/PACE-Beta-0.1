import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export interface Asset {
  id: string;
  name: string;
  type: string;
  symbol: string | null;
  quantity: number;
  current_value: number;
  acquisition_date: string;
}

export const useAssets = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching assets:", error);
        throw error;
      }

      return data as Asset[];
    },
  });

  const addAsset = useMutation({
    mutationFn: async (newAsset: Omit<Asset, "id" | "acquisition_date">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("assets")
        .insert([{ ...newAsset, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      toast({
        title: "Success",
        description: "Asset added successfully",
      });
    },
    onError: (error) => {
      console.error("Error adding asset:", error);
      toast({
        title: "Error",
        description: "Failed to add asset",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("assets-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "assets",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["assets"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    assets,
    isLoading,
    addAsset,
  };
};
