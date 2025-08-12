const ChartCard = ({ title, children, className = "" }) => (
  <div
    className={`bg-white/5 rounded-xl border border-white/10 p-6 ${className}`}
  >
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    {children}
  </div>
);

export default ChartCard