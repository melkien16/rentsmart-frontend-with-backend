import React from "react";
import { Edit, Trash2, MoreHorizontal, Eye } from "lucide-react";

export const DataTable = ({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onView,
  actions = ["edit", "delete"],
  className = "",
}) => {
  const getActionButton = (action, item) => {
    switch (action) {
      case "edit":
        return (
          <button
            key="edit"
            onClick={() => onEdit?.(item)}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
        );
      case "delete":
        return (
          <button
            key="delete"
            onClick={() => onDelete?.(item)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        );
      case "view":
        return (
          <button
            key="view"
            onClick={() => onView?.(item)}
            className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white/5 rounded-xl border border-white/10 overflow-hidden ${className}`}
    >
      {/* Mobile Cards */}
      <div className="block lg:hidden">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors"
          >
            <div className="space-y-3">
              {columns.map((column) => (
                <div
                  key={column.key}
                  className="flex justify-between items-start"
                >
                  <span className="text-gray-400 text-sm font-medium min-w-0 flex-1">
                    {column.label}:
                  </span>
                  <div className="text-white text-sm text-right min-w-0 flex-1">
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </div>
                </div>
              ))}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                {actions.map((action) => getActionButton(action, item))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-white/5 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-white"
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {actions.map((action) => getActionButton(action, item))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">No data available</p>
        </div>
      )}
    </div>
  );
};
