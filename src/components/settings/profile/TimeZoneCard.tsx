import { useState } from "react";
import { Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const timeZones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export const TimeZoneCard = () => {
  const [timeZone, setTimeZone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateTimeZone = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({ timezone: timeZone })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Time zone updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update time zone",
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
          <Clock className="h-5 w-5" />
          Time Zone
        </CardTitle>
        <CardDescription>
          Set your default time zone for accurate scheduling
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setTimeZone} value={timeZone}>
          <SelectTrigger>
            <SelectValue placeholder="Select your time zone" />
          </SelectTrigger>
          <SelectContent>
            {timeZones.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="w-full text-white bg-[#050524] hover:bg-blue-600/10 hover:text-white"
          onClick={handleUpdateTimeZone}
          disabled={!timeZone || isLoading}
        >
          {isLoading ? "Updating..." : "Update Time Zone"}
        </Button>
      </CardContent>
    </Card>
  );
};
