import { useState } from "react";
import { FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const BioCard = () => {
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateBio = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({ bio })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Bio updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bio",
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
          <FileText className="h-5 w-5" />
          Bio
        </CardTitle>
        <CardDescription>
          Add or update a short description about yourself
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Write a short bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="min-h-[100px]"
        />
        <Button
          className="w-full text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          onClick={handleUpdateBio}
          disabled={!bio || isLoading}
        >
          {isLoading ? "Updating..." : "Update Bio"}
        </Button>
      </CardContent>
    </Card>
  );
};
