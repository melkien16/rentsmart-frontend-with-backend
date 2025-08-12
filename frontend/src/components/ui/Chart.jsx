import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Chart = ({
  data,
  type,
  dataKey = "value",
  xAxisKey = "name",
  color = "#00FF99",
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  gradient = true,
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 shadow-xl">
          <p className="text-emerald-400 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white">
              {entry.name}:{" "}
              <span className="text-emerald-400 font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            )}
            <XAxis dataKey={xAxisKey} stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: color, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            )}
            <XAxis dataKey={xAxisKey} stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={gradient ? `url(#${gradientId})` : color}
            />
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            )}
            <XAxis dataKey={xAxisKey} stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      case "pie":
        const COLORS = ["#00FF99", "#00E68B", "#00CC7A", "#00B369", "#009957"];
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};
