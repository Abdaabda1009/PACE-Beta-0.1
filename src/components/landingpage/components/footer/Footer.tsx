import { APP_NAME } from "@/lib/constants";
import { NewsletterSection } from "./NewsletterSection";
import { BrandSection } from "./BrandSection";
import { FooterLinks } from "./FooterLinks";
import { ContactSection } from "./ContactSection";
import { Copyright } from "./Copyright";

export const Footer = () => {
  const serviceLinks = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
    { to: "/features", label: "Features" },
    { to: "/blog", label: "Blog" },
  ];

  const community = [
    { to: "/dashboard", label: "Reddit" },
    { to: "/docs", label: "Discord" },
    { to: "/support", label: "Support" },,
  ];

  return (
    <footer className="bg-dashboard-background mt-16 rounded-xl sm:mt-24 py-12 sm:py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <NewsletterSection />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <BrandSection />
          <FooterLinks title="Service" links={serviceLinks} />
          <FooterLinks title="Community" links={community} />
          <ContactSection />
        </div>

        <Copyright />
      </div>
    </footer>
  );
};