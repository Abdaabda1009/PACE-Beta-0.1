import { Link } from "react-router-dom";

interface FooterLinksProps {
  title: string;
  links: Array<{
    to?: string; // Optional for internal links
    href?: string; // Optional for external links
    label: string;
  }>;
}

export const FooterLinks = ({ title, links }: FooterLinksProps) => {
  return (
    <div className="mt-4 sm:mt-0">
      <h4
        className="text-white font-semibold text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">
        {title}
      </h4>
      <ul className="space-y-3 sm:space-y-4">
        {links.map((link) => {
          // If there's an `href`, it's an external link
          if (link.href) {
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dashboard-muted hover:text-white transition-colors text-sm sm:text-base"
                >
                  {link.label}
                </a>
              </li>
            );
          }

          // Otherwise, it's an internal link with `to`
          return (
            <li key={link.to}>
              <Link
                to={link.to!} // Since `to` is required here, use `!` for TypeScript
                className="text-dashboard-muted hover:text-white transition-colors text-sm sm:text-base"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
