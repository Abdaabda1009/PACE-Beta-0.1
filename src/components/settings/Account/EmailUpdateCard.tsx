import { useState } from "react";
import { Mail } from "lucide-react";
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
export const EmailUpdateCard = () => {
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleEmailUpdate = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ email: newEmail });

      if (error) throw error;
      toast({
        title: "Verification email sent",
        description: "Please check your email to confirm the change",
      });
      setNewEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 ">
          <Mail className="h-5 w-5" />
          Email Address
        </CardTitle>
        <CardDescription>
          Update your email address. You'll need to verify the new email.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="New email address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <Button
          className="w-full text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          onClick={handleEmailUpdate}
          disabled={!newEmail || isLoading}
        >
          {isLoading ? "Updating..." : "Update Email"}
        </Button>
      </CardContent>
    </Card>
  );
};
