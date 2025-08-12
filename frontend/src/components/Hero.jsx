import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Play,
  Star,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Wrench,
  Award,
} from "lucide-react";
import { Button } from "./ui/Button";

export const Hero = () => {
  // Animated counters
  const [users, setUsers] = useState(0);
  const [tools, setTools] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [rentals, setRentals] = useState(0);

  useEffect(() => {
    let usersTarget = 50000;
    let toolsTarget = 10000;
    let satisfactionTarget = 99.8;
    let rentalsTarget = 150000;
    let usersStep = Math.ceil(usersTarget / 100);
    let toolsStep = Math.ceil(toolsTarget / 100);
    let satStep = satisfactionTarget / 100;
    let rentalsStep = Math.ceil(rentalsTarget / 100);
    let interval = setInterval(() => {
      setUsers((prev) => {
        if (prev < usersTarget) return Math.min(prev + usersStep, usersTarget);
        return prev;
      });
      setTools((prev) => {
        if (prev < toolsTarget) return Math.min(prev + toolsStep, toolsTarget);
        return prev;
      });
      setSatisfaction((prev) => {
        if (prev < satisfactionTarget)
          return Math.min(prev + satStep, satisfactionTarget);
        return prev;
      });
      setRentals((prev) => {
        if (prev < rentalsTarget)
          return Math.min(prev + rentalsStep, rentalsTarget);
        return prev;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        {/* Animated floating elements - hidden on mobile for performance */}
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Particle effect dots - reduced on mobile */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Feature Cards - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-float">
          <div className="p-3">
            <Shield className="w-5 h-5 text-emerald-400 mb-1" />
            <div className="text-white text-xs font-medium">Secure Rentals</div>
          </div>
        </div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-float delay-1000">
          <div className="p-2">
            <Zap className="w-4 h-4 text-blue-400 mb-1" />
            <div className="text-white text-xs font-medium">Instant Access</div>
          </div>
        </div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-float delay-2000">
          <div className="p-3">
            <TrendingUp className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-white text-xs font-medium">Best Prices</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 border border-emerald-400/30 rounded-full text-emerald-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm shadow-lg">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            <span className="mr-1">🚀</span>
            <span className="hidden sm:inline">
              The Future of Tool Rental is Here
            </span>
            <span className="sm:hidden">Future of Rentals</span>
            <span className="ml-1">⚡</span>
          </div>

          {/* Enhanced Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-none tracking-tight">
            <span className="block">
              Rent
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                {" "}
                Smart
              </span>
            </span>
            <span className="block text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3">
              Build Better
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 font-light">
            Access premium tools and equipment instantly. From professional
            cameras to construction gear,
            <span className="text-emerald-400 font-medium">
              {" "}
              everything you need is just a tap away.
            </span>
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 text-sm w-full sm:w-auto"
            >
              <span className="relative z-10">Start Renting Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Play}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-xl text-sm w-full sm:w-auto"
            >
              <span className="relative z-10">Watch Demo</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Enhanced Stats - Mobile optimized grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mr-2" />
                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-emerald-400">
                  {users.toLocaleString()}+
                </div>
              </div>
              <div className="text-gray-300 font-medium text-xs sm:text-sm">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2" />
                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-blue-400">
                  {tools.toLocaleString()}+
                </div>
              </div>
              <div className="text-gray-300 font-medium text-xs sm:text-sm">
                Tools Available
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2" />
                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-purple-400">
                  {satisfaction.toFixed(1)}%
                </div>
              </div>
              <div className="text-gray-300 font-medium text-xs sm:text-sm">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" />
                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-yellow-400">
                  {rentals.toLocaleString()}+
                </div>
              </div>
              <div className="text-gray-300 font-medium text-xs sm:text-sm">
                Successful Rentals
              </div>
            </div>
          </div>

          {/* Trust Indicators - Hidden on mobile to save space */}
          <div className="hidden md:flex mt-12 items-center justify-center gap-6 opacity-60">
            <div className="flex items-center text-gray-400 text-sm">
              <Shield className="w-4 h-4 mr-1" />
              Secure Payments
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Zap className="w-4 h-4 mr-1" />
              Instant Booking
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Star className="w-4 h-4 mr-1" />
              Verified Tools
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Users className="w-4 h-4 mr-1" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="group cursor-pointer">
          <div className="hover:cursor-pointer w-6 h-10 sm:w-8 sm:h-12 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full mt-2 animate-bounce group-hover:animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add custom animations to your CSS
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
