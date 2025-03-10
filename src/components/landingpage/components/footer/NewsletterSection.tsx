import React from "react";
export const NewsletterSection = () => {
  return (
    <div className="border border-blue-600/50 rounded-xl p-4 sm:p-8 mb-12 sm:mb-16">
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
          <button className="w-full sm:w-auto px-6 py-2 border border-blue-600/50 text-white-400 rounded-lg font-medium hover:bg-blue-200/20 text-white transition-colors">
            Subscribe
          </button>
        </div>
      </div>
      
    </div>
  );
};
