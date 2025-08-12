import { useState } from "react";
import {
  Plus,
  X,
  Clock,
  Download,
  Settings,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  Paperclip,
} from "lucide-react";

import { mockSupportData } from "../mockUserData";

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    category: "",
    priority: "medium",
    description: "",
  });

  const filteredTickets =
    selectedCategory === "all"
      ? mockSupportData.tickets
      : mockSupportData.tickets.filter(
          (ticket) => ticket.category === selectedCategory
        );

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      case "in-progress":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "resolved":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      case "medium":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "low":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  const handleCreateTicket = () => {
    // In a real app, this would create a ticket in the backend
    setShowNewTicketModal(false);
    setNewTicket({
      title: "",
      category: "",
      priority: "medium",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-400/10 via-red-400/10 to-pink-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-orange-400" />
              Support Center
            </h2>
            <p className="text-gray-300 mt-2">
              Get help and report issues with your rental experience
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-orange-400"
            >
              <option value="all">All Categories</option>
              {mockSupportData.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="px-6 py-2 bg-orange-400 text-black rounded-xl hover:bg-orange-500 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Plus className="w-4 h-4" />
              New Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-2xl border border-orange-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">
                Total Tickets
              </p>
              <p className="text-3xl font-bold text-white">
                {mockSupportData.tickets.length}
              </p>
              <p className="text-orange-400 text-sm flex items-center gap-1">
                <HelpCircle className="w-4 h-4" />
                Support requests
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-400/20 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl border border-red-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Open Tickets</p>
              <p className="text-3xl font-bold text-white">
                {
                  mockSupportData.tickets.filter((t) => t.status === "open")
                    .length
                }
              </p>
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Need attention
              </p>
            </div>
            <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-white">
                {
                  mockSupportData.tickets.filter(
                    (t) => t.status === "in-progress"
                  ).length
                }
              </p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Being worked on
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Resolved</p>
              <p className="text-3xl font-bold text-white">
                {
                  mockSupportData.tickets.filter((t) => t.status === "resolved")
                    .length
                }
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Completed
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Support Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSupportData.categories.map((category) => (
            <div
              key={category.id}
              className="bg-white/5 rounded-xl border border-white/10 p-4 hover:border-orange-400/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{category.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {category.count} tickets
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Support Tickets</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-orange-400/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      {ticket.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {ticket.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                      Category:{" "}
                      <span className="text-white">{ticket.category}</span>
                    </span>
                    <span className="text-gray-400">
                      Created:{" "}
                      <span className="text-white">{ticket.createdAt}</span>
                    </span>
                    <span className="text-gray-400">
                      Updated:{" "}
                      <span className="text-white">{ticket.lastUpdated}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {ticket.attachments.length > 0 && (
                      <span className="text-blue-400 text-xs flex items-center gap-1">
                        <Paperclip className="w-3 h-3" />
                        {ticket.attachments.length} attachment
                        {ticket.attachments.length > 1 ? "s" : ""}
                      </span>
                    )}
                    <span className="text-gray-400 text-xs">
                      {ticket.messages.length} messages
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-400" />
                  {selectedTicket.title}
                </h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Status</label>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Priority</label>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getPriorityColor(
                      selectedTicket.priority
                    )}`}
                  >
                    {selectedTicket.priority}
                  </span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Category</label>
                  <p className="text-white">{selectedTicket.category}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Created</label>
                  <p className="text-white">{selectedTicket.createdAt}</p>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Description</label>
                <p className="text-gray-300 mt-2">
                  {selectedTicket.description}
                </p>
              </div>

              {selectedTicket.attachments.length > 0 && (
                <div>
                  <label className="text-gray-400 text-sm">Attachments</label>
                  <div className="mt-2 space-y-2">
                    {selectedTicket.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                      >
                        <Paperclip className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm">{attachment}</span>
                        <button className="ml-auto text-blue-400 hover:text-blue-300">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-gray-400 text-sm">Messages</label>
                <div className="mt-4 space-y-4 max-h-64 overflow-y-auto">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-white/10 text-white"
                            : "bg-orange-400 text-black"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-gray-400"
                              : "text-orange-900"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition-colors font-semibold">
                  Add Message
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Create New Support Ticket
                </h3>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">Title</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Category</label>
                <select
                  value={newTicket.category}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                >
                  <option value="">Select a category</option>
                  {mockSupportData.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, priority: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Description</label>
                <textarea
                  rows={4}
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors resize-none"
                  placeholder="Please provide detailed information about your issue..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCreateTicket}
                  className="flex-1 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition-colors font-semibold"
                >
                  Create Ticket
                </button>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support