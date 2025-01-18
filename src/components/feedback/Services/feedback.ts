import { supabase } from "@/integrations/supabase/client";

export interface FeedbackData {
  feature: string;
  rating: number;
  feedback: string;
}

export const submitFeedback = async (data: FeedbackData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase.from("feedback").insert([
    {
      ...data,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
};
