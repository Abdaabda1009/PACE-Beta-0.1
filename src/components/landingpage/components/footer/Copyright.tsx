import { APP_NAME } from "@/lib/constants";
export const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 text-center">
      <p className="text-dashboard-muted text-sm sm:text-base">
        © {currentYear} {APP_NAME}. All rights reserved.
      </p>
    </div>
  );
};
