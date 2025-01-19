import { useState } from "react";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const DisplayNameCard = () => {
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateName = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: displayName })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Display name updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update display name",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Display Name
        </CardTitle>
        <CardDescription>
          Edit your name as it appears across the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter your display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Button
          className="w-full text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          onClick={handleUpdateName}
          disabled={!displayName || isLoading}
        >
          {isLoading ? "Updating..." : "Update Name"}
        </Button>
      </CardContent>
    </Card>
  );
};
