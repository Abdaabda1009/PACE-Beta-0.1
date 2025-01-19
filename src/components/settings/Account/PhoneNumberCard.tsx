import { useState } from "react";
import { Phone } from "lucide-react";
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
export const PhoneNumberCard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handlePhoneUpdate = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        phone: phoneNumber,
      });
      if (error) throw error;
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the verification code.",
      });
      setPhoneNumber("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update phone number. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="Flex items-center gap-2 ">
          <Phone className="h-5 w-5" />
          Phone Number
        </CardTitle>
        <CardDescription>
          Update your phone number for two-factor authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          className="w-full text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          onClick={handlePhoneUpdate}
          disabled={!phoneNumber || isLoading}
        >
          {isLoading ? "Updating.." : "Update Phone"}
        </Button>
      </CardContent>
    </Card>
  );
};
