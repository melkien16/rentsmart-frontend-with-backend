import React from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { FeaturedRentals } from "./FeaturedRentals";
import { HowItWorks } from "./HowItWorks";
import { Categories } from "./Categories";
import { Testimonials } from "./Testimonials";

export const LandingPage = ({ onSignInClick, onBrowseClick }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar onSignInClick={onSignInClick} onBrowseClick={onBrowseClick} />
      <Hero />
      <FeaturedRentals />
      <HowItWorks />
      <Categories />
      <Testimonials />
    </div>
  );
};
