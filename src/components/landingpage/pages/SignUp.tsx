import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { ArrowLeft } from "lucide-react";

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  reason: z.string().optional(),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      reason: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log("Form submitted:", data);

    // Show success toast
    toast({
      title: "Sign Up Successful!",
      description:
        "Thank you for your interest. We'll be in touch soon. Check your email for instructions and next steps.",
      variant: "default",
    });

    // Redirect to home page after short delay
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[hsl(222.2,84%,4.9%)] flex items-center justify-center px-4 py-12 relative">
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-white flex items-center gap-2 hover:bg-blue-200/20 transition-colors duration-200"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 -h-4" />
        Return to Home
      </Button>
      <div className="w-full max-w-md space-y-8 bg-[#1A1F2C]/50 p-8 rounded-xl backdrop-blur-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Sign Up for Early Access
          </h1>
          <p className="text-gray-400">
            Join the waitlist to get early access to PACE
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="bg-[#12141D] border-[#2A2F3E] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      {...field}
                      className="bg-[#12141D] border-[#2A2F3E] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Company (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your company name"
                      {...field}
                      className="bg-[#12141D] border-[#2A2F3E] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Why are you interested? (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're interested in PACE"
                      {...field}
                      className="bg-[#12141D] border-[#2A2F3E] text-white resize-none min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SpotlightCard
              className="w-full h-[60px] border-0 p-1 rounded-lg bg-transparent flex justify-center hover:scale-105"
              spotlightColor="rgba(65, 126, 223, 0.25)"
            >
              <Button
                type="submit"
                className="h-full w-full bg-transparent border-2 md:border-blue-600/50 hover:bg-blue-600/5 transition-colors duration-200 rounded-lg text-whitefont-semibold"
              >
                Join Waitlist
              </Button>
            </SpotlightCard>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
