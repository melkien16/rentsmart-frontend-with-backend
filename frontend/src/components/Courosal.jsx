import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "./ui/MessageModal";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products = [], isLoading, error } = useGetTopProductsQuery();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [products]);

  if (isLoading) return null;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <div className="relative overflow-hidden mr-auto ml-auto rounded-2xl h-[400px] mb-4">
      {products.map((product, i) => (
        <div
          key={product._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          <Link to={`/items/${product._id}`}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 px-4 py-2 rounded text-white">
              <h2 className="text-lg font-semibold">
                {product.title} (${product.price})
              </h2>
            </div>
          </Link>
        </div>
      ))}

      {/* Always visible indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[6px] w-6 rounded-md transition-all duration-500 ${
              i === index
                ? "bg-[#00FF99] shadow-[0_0_10px_#00FF99]"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
