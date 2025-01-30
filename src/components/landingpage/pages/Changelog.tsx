import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const updates = [
  {
    id: 1,
    date: "April 1, 2024",
    title: "Beta Pre-Release",
    content:
      "Launching PACE Finance with core features to help you manage your financial life effectively.",
    features: [
      "Finalized all core features, including subscription tracker, budget planner, and debt management, ensuring MVP functionality is stable and user-friendly.",
      "Enhanced navigation menus for better accessibility and improved mobile responsiveness. Added right-aligned menu for a modern layout and streamlined user interactions.",
      "Resolved issues with dropdown positioning, menu collapsibility, and authentication button alignment. Fixed minor visual inconsistencies in the appearance settings cards.",
      "Minimized asset load times and optimized components for smoother performance on low-end devices. Reduced memory usage in key app modules.",
      "Incorporated feedback from alpha testers, refining error messages, and improving layout flexibility.",
    ],
  },
];

export const Changelog = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="min-h-screen text-white">
      <LandingNavbar />
      <div className="container mx-auto px-12 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Changelog</h1>
          <p className="text-lg text-white/60 mb-8">
            New updates and improvements to PACE innovation.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex gap-2 mb-16 max-w-md"
          >
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
            <Button
              type="submit"
              className="h-full w-[200px] bg-gradient-to-r from-[#ADADAD] to-[#1A7DAF] hover:bg-clip-text hover:text-transparent transition-colors duration-200"
            >
              Subscribe
            </Button>
          </form>

          <div className="space-y-16">
            {updates.map((update) => (
              <article key={update.id} className="relative">
                <time className="text-sm text-white/60 mb-4 block">
                  {update.date}
                </time>
                <h2 className="text-2xl font-semibold mb-4">{update.title}</h2>
                <div className="prose prose-invert">
                  <p className="text-white/80 mb-4">{update.content}</p>
                  <ul className="space-y-3 text-white/80 list-none">
                    {update.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/30 to-purple-600/30 blur-3xl" />
      </div>
    </div>
  );
};
