import React from "react";
export const NewsletterSection = () => {
  return (
    <div className="bg-blue-600 rounded-xl p-6 sm:p-8 mb-12 sm:mb-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-white text-center md:text-left">
          Subscribe Newsletter
        </h3>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-80 px-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:border-white/40"
          />
          <button className="w-full sm:w-auto px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
