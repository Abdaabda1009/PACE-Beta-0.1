
import { NewsletterSection } from "./NewsletterSection";
import { BrandSection } from "./BrandSection";
import { FooterLinks } from "./FooterLinks";
import { ContactSection } from "./ContactSection";
import { Copyright } from "./Copyright";

export const Footer = () => {
  const serviceLinks = [
    { to: "/Product", label: "Product" },
    { to: "/Features", label: "Features" },
    { to: "/blog", label: "Blog" },
    { to: "/Changelog", label: "Changelog" },
    { to:"/Company", label: "Company"},
  ];

  const communityLinks = [
    { href: "https://www.reddit.com/r/PACEDebtfree/", label: "Reddit" },
    { href: "https://twitter.com", label: "X" },
    { href: "https://discord.gg/cpCM8jKZ", label: "Discord" },
    {
      href: "https://featuresrequest.slack.com/archives/C088ZV8D3CG",
      label: "Slack",
    },
  ];

  return (
    <footer className="border-1 border-blue-200 mt-8 sm:mt-16 lg:mt-24 py-8 sm:py-12 lg:py-16 border-t border-blue-400 rounded-lg">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <BrandSection />
          <FooterLinks title="Service" links={serviceLinks} />
          <FooterLinks title="Community" links={communityLinks} />
          <ContactSection />
        </div>

        <Copyright />
      </div>
    </footer>
  );
};
