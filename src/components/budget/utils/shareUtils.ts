import { toast } from "@/components/ui/use-toast";

export const shareBudgetOverview = () => {
  const shareData = {
    title: 'Budget Overview',
    text: 'Check out my budget overview!',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => {
        toast({
          title: "Shared Successfully",
          description: "Your budget overview has been shared",
        });
      })
      .catch(() => {
        copyToClipboard();
      });
  } else {
    copyToClipboard();
  }
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
  toast({
    title: "Link Copied!",
    description: "Budget overview link has been copied to clipboard",
  });
};