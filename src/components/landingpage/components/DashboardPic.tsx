export const DashboardPic = () => {
  return (
    <div className="relative w-full bg-dashboard-card/50 backdrop-blur-sm rounded-lg overflow-hidden mt-8 sm:mt-12 md:mt-16 aspect-video">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/assets/dashboard.png"
            alt="Platform Preview"
            className="w-full h-full object-fill opacity-100"
          />
        </div>
      </div>
    </div>
  );
};