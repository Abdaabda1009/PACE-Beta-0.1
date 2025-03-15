
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
    <footer className="border-t border-gray-200 mt-16 lg:mt-24 py-12 lg:py-16 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12">
          <div className="md:col-span-2 lg:col-span-1">
          <BrandSection />
          </div>
          <FooterLinks title="Service" links={serviceLinks} />
          <FooterLinks title="Community" links={communityLinks} />
          <ContactSection />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};
