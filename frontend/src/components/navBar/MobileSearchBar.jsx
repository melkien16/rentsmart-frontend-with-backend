import React from "react";
import { Search, Mic, X } from "lucide-react";

const MobileSearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  listening,
  handlePressStart,
  handlePressEnd,
  lang,
}) => {
  return (
    <div className="md:hidden flex-1 max-w-sm mx-4">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search equipment..."
          className="w-full pl-10 sm:pl-12 pr-16 sm:pr-20 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all duration-300 text-sm sm:text-base"
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
            className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MobileSearchBar;
