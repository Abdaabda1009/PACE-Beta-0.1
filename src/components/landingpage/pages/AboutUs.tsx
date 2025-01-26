import React from "react";

const AboutUs = () => {
  return (
    <section className="pr-20 pl-20 mx-auto bg-black px-4 py-8 relative">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
          <p className="text-lg text-gray-400 mt-4">
            Empowering your financial future with AI-driven tools and insights.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-600">
              Our Mission
            </h2>
            <p className="text-gray-600 mt-4">
              To simplify personal finance management, enabling users to save
              more, spend smarter, and achieve their financial goals
              effortlessly.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-600">Our Vision</h2>
            <p className="text-gray-600 mt-4">
              Creating a world where financial management is intuitive,
              accessible, and stress-free for everyone.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-800">Our Core Values</h2>
          <div className="flex justify-center flex-wrap gap-6 mt-6">
            {["Transparency", "Simplicity", "Empowerment", "Innovation"].map(
              (value, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-700 rounded-lg px-6 py-3 shadow-sm"
                >
                  {value}
                </div>
              )
            )}
          </div>
        </div>

        {/* Problem Solving Section */}
        <div className="mt-12 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            The Problem We Solve
          </h2>
          <p className="text-gray-600 mt-4">
            Managing finances can be overwhelming. With our platform, users gain
            clarity through automated budgeting tools, debt tracking, and
            spending insights—making financial management stress-free and
            effective.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-800">
            Ready to take control of your finances?
          </h2>
          <p className="text-gray-600 mt-4">
            Join us on this journey to financial freedom.
          </p>
          <button className="mt-6 bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-500">
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;