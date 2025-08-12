import React from "react";
import { Search, Filter, Plus } from "lucide-react";

export const FilterBar = ({
  searchTerm,
  onSearchChange,
  filters = [],
  onFilterChange,
  showAddButton = false,
  onAddClick,
  addButtonText = "Add New",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${className}`}
    >
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <select
            key={filter.key}
            value={filter.value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 min-w-0"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Add Button */}
      {showAddButton && (
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{addButtonText}</span>
        </button>
      )}
    </div>
  );
};
