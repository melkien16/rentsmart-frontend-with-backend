import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useSelector } from "react-redux";

import footerLinks from "./footerLinks";
import socialLinks from "./socialLinks";
import MessageModal from "../ui/MessageModal";

import {
  useAddSubscriberMutation,
  useIsSubscribedQuery,
} from "../../slices/subscribesApi";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [addSubscriber] = useAddSubscriberMutation();
  const { data: isSubscribedData } = useIsSubscribedQuery(userInfo?.email, {
    skip: !userInfo,
  });

  // derive a safe subscription state
  const isSubscribed = userInfo ? isSubscribedData?.subscribed : false;

  const handleSubscription = () => {
    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    addSubscriber({ email })
      .unwrap()
      .then(() => {
        setError(false);
        setMessage("Thank you for subscribing to our newsletter!");
        setEmail("");
      })
      .catch((err) => {
        if (err?.data?.message) {
          setError(true);
          setMessage(err.data.message);
        } else {
          setError(true);
          setMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
            Stay Updated with{" "}
            <span className="text-emerald-400">RentSmart</span>
          </h3>
          <p className="text-gray-300 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base px-2 sm:px-4">
            Get the latest updates on new tools, special offers, and industry
            insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 sm:gap-4">
            {!isSubscribed && (
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-xs sm:text-sm lg:text-base"
                />
              </div>
            )}

            <button
              onClick={() => {
                if (!isSubscribed) {
                  handleSubscription();
                }
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold rounded-xl hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base
      ${isSubscribed ? "w-full" : "w-full sm:w-auto"}`}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              {isSubscribed ? "Subscribed" : "Subscribe Now"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center space-x-2 mb-4 sm:mb-6">
              <img src="/withWordMark.svg" alt="" className="w-full h-32" />
            </a>
            <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base">
              The future of tool rental. Access professional equipment instantly
              with our smart rental platform.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300"
                >
                  <social.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 lg:mb-6">
                {category}
              </h4>
              <ul className="space-y-1 sm:space-y-2 lg:space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm lg:text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 lg:mt-16 pt-4 sm:pt-6 lg:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © 2025 RentSmart. All rights reserved.
          </p>
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            <span className="text-gray-400 text-xs sm:text-sm">Made with</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-xs sm:text-sm">
              for the future
            </span>
          </div>
        </div>
        {/* Show modal if there's a message */}
        {message && (
          <MessageModal
            type={error ? "error" : "success"}
            title={error ? "Subscription Error" : "Subscription Successful"}
            message={message}
            onClose={() => setMessage("")}
          />
        )}
      </div>
    </footer>
  );
};
