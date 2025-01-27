export const PoweredBy = () => {
  const icons = [
    "chatgbt.png",
    "klarna.png",
    "microsoft.png",
    "replicate.png",
    "replicate1.png",
    "stripe.png",
  ];

  return (
    <div className="mt-12 lg:mt-8 border border-blue-500/20 rounded-lg p-6 lg:p-8 mx-4 lg:mx-0">
      <div className="text-center justify-between mb-6">
        <h3 className="text-white text-lg">Powered By Leading Technologies</h3>
      </div>
      <div className="flex items-center justify-center gap-24 sm:gap-24 flex-wrap">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="w-16 h-15  rounded-full flex items-center justify-center"
            aria-label={`Technology Partner ${index + 1}`}
          >
            <img
              src={`/assets/${icon}`} // Correct path to the image
              alt={`Technology Partner ${index + 1}`}
              className="w-16 h-15 rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
