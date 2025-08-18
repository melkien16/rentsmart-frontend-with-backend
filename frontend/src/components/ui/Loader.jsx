const Loader = () => {
  return (
    <div className="h-full w-full fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-32 h-32 animate-spin border-8 border-transparent border-t-emerald-400 border-r-emerald-500 rounded-full">
        {/* Blink effect with Tailwind animate-pulse */}
        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-emerald-400 border-r-emerald-500 animate-pulse"></div>

        {/* Centered RS text */}
        <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-black text-4xl select-none">
          RS
        </div>
      </div>
    </div>
  );
};

export default Loader;
