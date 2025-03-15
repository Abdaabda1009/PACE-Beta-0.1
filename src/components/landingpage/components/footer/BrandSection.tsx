export const BrandSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center md:justify-start">
        <div className="group relative flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity duration-200">
          {/* Logo with responsive sizing and hover effect */}
          <a
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            aria-label="Return to homepage"
          >
            <img
              src="assets/logoicon.png"
              alt="Company Logo"
              className="w-32 h-auto md:w-40 lg:w-48 transition-transform duration-300 hover:scale-105"
              loading="lazy"
              width={256}
              height={256}
            />
          </a>
        </div>
      </div>
    </section>
  );
};