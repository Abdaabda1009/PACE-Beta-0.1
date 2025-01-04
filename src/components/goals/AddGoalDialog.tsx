import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useCurrencyPreference } from "@/hooks/useCurrencyPreference";

interface AddGoalFormValues {
  name: string;
  targetAmount: number;
  completionDate: string;
}

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoalAdded: () => void;
}

export const AddGoalDialog = ({
  open,
  onOpenChange,
  onGoalAdded,
}: AddGoalDialogProps) => {
  const form = useForm<AddGoalFormValues>();
  const { currency } = useCurrencyPreference();

  const onSubmit = async (data: AddGoalFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add a goal",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("goals").insert({
        name: data.name,
        target_amount: data.targetAmount,
        completion_date: data.completionDate,
        saved_amount: 0,
        user_id: user.id,
        currency: currency,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Goal added successfully",
      });

      onOpenChange(false);
      form.reset();
      onGoalAdded();
    } catch (error) {
      console.error("Error adding goal:", error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Goal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Goal Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#050524] border-gray-800 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Target Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="bg-[#050524] border-gray-800 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Completion Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className="bg-[#050524] border-gray-800 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-[#050524] text-white border-gray-800 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Goal
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
