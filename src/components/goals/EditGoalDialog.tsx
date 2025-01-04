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

interface EditGoalFormValues {
  name: string;
  targetAmount: number;
  savedAmount: number;
  completionDate: string;
}

interface EditGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: {
    id: string;
    name: string;
    target_amount: number;
    saved_amount: number;
    completion_date: string;
  };
  onSave: () => void;
}

export const EditGoalDialog = ({
  open,
  onOpenChange,
  goal,
  onSave,
}: EditGoalDialogProps) => {
  const { currency } = useCurrencyPreference();
  const form = useForm<EditGoalFormValues>({
    defaultValues: {
      name: goal.name,
      targetAmount: goal.target_amount,
      savedAmount: goal.saved_amount,
      completionDate: goal.completion_date,
    },
  });

  const onSubmit = async (data: EditGoalFormValues) => {
    try {
      const { error } = await supabase
        .from("goals")
        .update({
          name: data.name,
          target_amount: data.targetAmount,
          saved_amount: data.savedAmount,
          completion_date: data.completionDate,
          currency: currency,
        })
        .eq("id", goal.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Goal updated successfully",
      });

      onOpenChange(false);
      onSave();
    } catch (error) {
      console.error("Error updating goal:", error);
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Goal</DialogTitle>
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
              name="savedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Saved Amount</FormLabel>
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
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
