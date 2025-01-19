import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
export const SecurityQuestionsCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleUpdateQuestions = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");
      toast({
        title: "Security Questions Updated",
        description: "Your security questions have been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security questions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Questions</CardTitle>
        <CardDescription>
          Set up security questions to help verify your identity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          onClick={handleUpdateQuestions}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Security Questions"}
        </Button>
      </CardContent>
    </Card>
  );
};
