import React from "react";
import { Star, Quote } from "lucide-react";
import { Card } from "./ui/Card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Photographer",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      content:
        "RentSmart saved my business. Access to professional cameras without the huge upfront costs has been game-changing.",
    },
    {
      name: "Mike Rodriguez",
      role: "Construction Manager",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      content:
        "The quality of tools is exceptional and delivery is always on time. Perfect for project-based work.",
    },
    {
      name: "Emily Chen",
      role: "Event Coordinator",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      content:
        "From projectors to sound systems, RentSmart has everything I need for successful events. Highly recommended!",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our <span className="text-emerald-400">Users Say</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
            Join thousands of satisfied customers who trust RentSmart for their
            equipment needs
          </p>
        </div>

        {/* Testimonials Grid - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="text-center hover:scale-105 transition-transform duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-emerald-400 mx-auto mb-3 sm:mb-4 lg:mb-6" />

              {/* Rating */}
              <div className="flex justify-center mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-3 sm:mb-4 lg:mb-6 leading-relaxed italic text-xs sm:text-sm lg:text-base px-2 sm:px-4">
                "{testimonial.content}"
              </p>

              {/* Avatar and Info */}
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-emerald-400/30"
                />
                <div className="text-left">
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
