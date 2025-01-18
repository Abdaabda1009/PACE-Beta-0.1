import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "./StarRating";
import { FeedbackAlert } from "./FeedbackAlert";
import { submitFeedback } from "../feedback/Services/feedback"

const features = [
  { id: "budget", label: "Budget Overview" },
  { id: "goals", label: "Goals" },
  { id: "subscriptions", label: "Subscription Tracker" },
  { id: "debt", label: "Debt Management" },
] as const;

const formSchema = z.object({
  feature: z.string({
    required_error: "Please select a feature to provide feedback on.",
  }),
  rating: z
    .number()
    .min(1, {
      message: "Please provide a rating.",
    })
    .max(5),
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
});

export const FeedbackForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feature: "",
      rating: 0,
      feedback: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await submitFeedback(values);

      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve our services.",
        variant: "default",
      });

      form.reset({
        feature: "",
        rating: 0,
        feedback: "",
      });
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description:
          "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-lg border border-dashboard-card bg-dashboard-card p-6 space-y-6">
          {submitted && (
            <FeedbackAlert
              type="success"
              message="Your feedback has been submitted successfully. Thank you for helping us improve!"
            />
          )}

          {hasErrors && (
            <FeedbackAlert
              type="error"
              message="Please complete all required fields correctly."
            />
          )}

          <FormField
            control={form.control}
            name="feature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Which feature would you like to provide feedback on?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`bg-dashboard-background border-dashboard-muted ${
                        form.formState.errors.feature
                          ? "border-dashboard-error"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select a feature" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {features.map((feature) => (
                      <SelectItem key={feature.id} value={feature.id}>
                        {feature.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-dashboard-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you rate this feature?</FormLabel>
                <StarRating
                  rating={field.value}
                  onChange={field.onChange}
                  error={!!form.formState.errors.rating}
                />
                <FormMessage className="text-dashboard-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please share your experience with this feature..."
                    className={`bg-dashboard-background min-h-[120px] resize-none ${
                      form.formState.errors.feedback
                        ? "border-dashboard-error focus-visible:ring-dashboard-error"
                        : "border-dashboard-muted"
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-dashboard-error" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors"
            disabled={!form.formState.isValid || isSubmitting}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
