export const DashboardPic = () => {
  return (
    <div className="mt-16 relative w-full aspect-video bg-dashboard-card/50 backdrop-blur-sm rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/assets/dashboard.png"
            alt="Platform Preview"
            className="w-full h-full object-cover opacity-100"
          />
        </div>
      </div>
    </div>
  );
};