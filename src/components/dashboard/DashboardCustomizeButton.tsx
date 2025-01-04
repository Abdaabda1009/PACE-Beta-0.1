import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardCustomizeButtonProps {
  preferences: {
    id: string;
    theme: string;
    layout_type: string;
    widget_order: string[];
  };
  onPreferencesUpdate: () => void;
}

export function DashboardCustomizeButton({
  preferences,
  onPreferencesUpdate,
}: DashboardCustomizeButtonProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLayoutChange = async (value: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("dashboard_preferences")
        .update({
          layout_type: value,
          updated_at: new Date().toISOString(),
        })
        .eq("id", preferences.id);

      if (error) throw error;

      toast({
        title: "Layout Updated",
        description: "Your dashboard layout has been updated successfully.",
      });

      onPreferencesUpdate();
      setOpen(false);
    } catch (error) {
      console.error("Error updating layout:", error);
      toast({
        title: "Error",
        description: "Failed to update dashboard layout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dashboard Preferences</DialogTitle>
          <DialogDescription>
            Customize how your dashboard looks and feels. Drag and drop widgets
            to reorder them.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Layout Type</Label>
            <RadioGroup
              defaultValue={preferences?.layout_type || "grid"}
              onValueChange={handleLayoutChange}
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grid" id="grid" />
                <Label htmlFor="grid">Grid Layout</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stack" id="stack" />
                <Label htmlFor="stack">Stacked Layout</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
