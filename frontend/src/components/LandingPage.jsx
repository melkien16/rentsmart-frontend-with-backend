import React from "react";
import { Navbar } from "./navBar/Navbar";
import { Hero } from "./Hero";
import { FeaturedRentals } from "./FeaturedRentals";
import { HowItWorks } from "./HowItWorks";
import { Categories } from "./Categories";
import { Testimonials } from "./Testimonials";
import ProductCarousel from "./Courosal";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Hero />
      <FeaturedRentals />
      <HowItWorks />
      <Categories />
      <Testimonials />
    </div>
  );
};
