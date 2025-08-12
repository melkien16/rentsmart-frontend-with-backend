import React from "react";

export const ResponsiveTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 sm:mb-12">
          Responsive Design Test
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Responsive Text Test */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 text-emerald-400">
              Text Responsiveness
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300">
              This text scales appropriately across different screen sizes using
              our responsive utility classes.
            </p>
          </div>

          {/* Responsive Spacing Test */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 text-blue-400">
              Spacing Responsiveness
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300">
              Padding and margins adjust automatically for optimal mobile and
              desktop viewing.
            </p>
          </div>

          {/* Touch Targets Test */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 text-purple-400">
              Touch-Friendly
            </h3>
            <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors text-sm sm:text-base font-medium touch-target">
              Touch Target (44px min)
            </button>
          </div>

          {/* Grid Responsiveness */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 text-yellow-400">
              Grid Layout
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300">
              Grid automatically adjusts from 1 column on mobile to 3 columns on
              desktop.
            </p>
          </div>

          {/* Animation Performance */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 text-red-400">
              Performance
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300">
              Animations are optimized for mobile devices and respect user
              preferences.
            </p>
          </div>

          {/* Container Responsiveness */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 text-indigo-400">
              Container
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300">
              Container padding adjusts automatically for optimal viewing on all
              devices.
            </p>
          </div>
        </div>

        {/* Responsive Stats */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400">
              100%
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Mobile Responsive
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400">
              44px
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Touch Targets
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400">
              4K
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Desktop Ready
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">
              60fps
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Smooth Animations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
