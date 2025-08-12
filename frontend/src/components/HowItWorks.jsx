import React from "react";
import { Search, Calendar, Truck, RotateCcw } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Search",
      description:
        "Find the perfect tool from our extensive catalog of professional equipment",
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description:
        "Select your dates and book instantly with our secure payment system",
    },
    {
      icon: Truck,
      title: "Get Delivered",
      description:
        "Receive your tools delivered to your location or pick up at a nearby hub",
    },
    {
      icon: RotateCcw,
      title: "Return Easy",
      description:
        "Return the equipment when done through our flexible return process",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            How It <span className="text-emerald-400">Works</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
            Get the tools you need in four simple steps
          </p>
        </div>

        {/* Steps - Mobile optimized layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connection Line - hidden on mobile, shown on larger screens */}
              {index < steps.length - 1 && (
                <>
                  {/* Horizontal line for mobile/tablet */}
                  <div className="hidden sm:block lg:hidden absolute top-10 sm:top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-400/50 to-transparent z-0"></div>
                  {/* Vertical line for mobile */}
                  <div className="sm:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-emerald-400/50 to-transparent z-0"></div>
                  {/* Horizontal line for desktop */}
                  <div className="hidden lg:block absolute top-10 sm:top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-400/50 to-transparent z-0"></div>
                </>
              )}

              {/* Step Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 border border-emerald-400/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-emerald-400" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-emerald-400 text-black rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm lg:text-base px-1 sm:px-2">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="px-5 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold rounded-xl hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-400/25 text-sm sm:text-base w-full sm:w-auto">
            Start Your First Rental
          </button>
        </div>
      </div>
    </section>
  );
};
