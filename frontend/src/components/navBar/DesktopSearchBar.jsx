import React from "react";
import { Search, Mic } from "lucide-react";
const DesktopSearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  listening,
  handlePressStart,
  handlePressEnd,
  searchFocused,
  setSearchFocused,
  lang,
}) => {
  return (
    <div className="hidden lg:flex flex-1 max-w-4xl mx-8">
      <form onSubmit={handleSearch} className="relative w-full group">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            searchFocused ? "opacity-100" : ""
          }`}
        ></div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search for tools, cameras, equipment..."
            className="w-full pl-12 pr-20 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all duration-300 backdrop-blur-sm text-base"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <button
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd} // if user drags away
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className={`p-1.5 sm:p-2 relative rounded-lg transition-all duration-300 ${
                listening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="absolute flex justify-center align-middle -top-1 -right-1 w-5 h-5  rounded-full border-none">
                <p className="font-extralight text-[12px] text-emerald-400">
                  {lang == "en-US" ? "en" : "am"}
                </p>
              </div>
              <Mic
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                  listening
                    ? "text-white"
                    : "text-gray-400 hover:text-emerald-400"
                }`}
              />
            </button>
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-400 hover:bg-emerald-500 transition-colors"
            >
              <Search className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DesktopSearchBar;
