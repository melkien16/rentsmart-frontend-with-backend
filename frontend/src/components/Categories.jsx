import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../slices/categoriesApiSlice";
import Loader from "./ui/Loader";
import { Button } from "./ui/Button";

export const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-purple-500",
    "from-yellow-500 to-orange-500",
    "from-gray-500 to-gray-700",
  ];

  const { data: categoriesData, isLoading, error } = useGetCategoryQuery();
  // if (isLoading) return <Loader />;
  if (error) return <div>Error loading categories {error}</div>;
  if (!categoriesData || categoriesData.length === 0) {
    return (
      <div className="text-center text-gray-500">No categories available</div>
    );
  }

  //fetch only top 6 categories for display by sorting thier count and slicing the array of objects
  const topCategories = [...categoriesData]
    .sort((a, b) => parseInt(b.count) - parseInt(a.count))
    .slice(0, 6)
    .map((category, index) => ({
      ...category,
      gradient: categories[index % categories.length],
    }));

  return (
    <section id="categories" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Popular <span className="text-emerald-400">Categories</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
            Explore our wide range of professional tools and equipment
          </p>
        </div>

        {/* Categories Grid - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-6">
          {topCategories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]"
              onClick={() =>
                navigate(`/items?category=${encodeURIComponent(category.name)}`)
              }
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
              ></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Icon */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <img src={category.image} alt={""} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                    {category.count} items available
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center text-emerald-400 font-medium group-hover:translate-x-2 transition-transform text-xs sm:text-sm lg:text-base">
                  <span>Explore</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* { Explore more button } */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="px-6 sm:px-8 py-3 bg-white/5 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-medium text-sm sm:text-base w-full sm:w-auto"
            onClick={() => navigate("/items")}
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};
