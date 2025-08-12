import React from "react";

export const ResponsiveLayout = ({
  children,
  sidebar,
  header,
  sidebarCollapsed,
  onToggleSidebar,
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 ${className}`}
    >
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-30">
        {sidebar}
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-60 transition-all duration-300">
        {/* Header - Fixed on mobile, normal on desktop */}
        <div className="lg:static fixed top-0 left-0 right-0 z-40 lg:z-auto">
          {header}
        </div>

        {/* Main Content - Add top padding on mobile for fixed header */}
        <main className="p-3 sm:p-4 md:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-8">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-black/95 backdrop-blur-md border-r border-white/10 transition-transform duration-300 z-50 lg:hidden ${
          sidebarCollapsed ? "translate-x-0" : "-translate-x-full"
        } w-72 sm:w-80`}
      >
        {sidebar}
      </div>
    </div>
  );
};

export const ResponsiveGrid = ({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 6,
  className = "",
}) => {
  const getGridCols = () => {
    const baseCols = cols.sm || 1;
    const mdCols = cols.md || baseCols;
    const lgCols = cols.lg || mdCols;
    const xlCols = cols.xl || lgCols;

    return `grid-cols-${baseCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols} xl:grid-cols-${xlCols}`;
  };

  return (
    <div className={`grid gap-${gap} ${getGridCols()} ${className}`}>
      {children}
    </div>
  );
};

export const ResponsiveCard = ({
  children,
  className = "",
  padding = "p-4 sm:p-6",
  hover = true,
}) => {
  return (
    <div
      className={`bg-white/5 rounded-xl border border-white/10 ${padding} ${
        hover ? "hover:bg-white/10" : ""
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
