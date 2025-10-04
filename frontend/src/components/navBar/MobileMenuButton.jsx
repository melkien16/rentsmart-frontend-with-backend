import React from "react";
import { Menu, X } from "lucide-react";

const MobileMenuButton = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 rounded-xl hover:bg-white/10 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default MobileMenuButton;
