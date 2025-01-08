import { Link } from "react-router-dom";
interface FooterLinksProps {
  title: string;
  links: Array<{
    to: string;
    label: string;
  }>;
}
export const FooterLinks = ({ title, links }: FooterLinksProps) => {
  return (
    <div className="mt-4 sm:mt-0">
      <h4 className="text-white font-semibold text-lg mb-4 sm:mb-6">{title}</h4>
      <ul className="space-y-3 sm:space-y-4">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-dashboard-muted hover:text-white transition-colors text-sm sm:text-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
