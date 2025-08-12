import React, { useState } from "react";
import {
  MessageSquare,
  CheckCircle,
  Clock,
  Eye,
  Send,
  Mail,
  Trash2,
  X
} from "lucide-react";

import { mockMessagesSupport} from "../mockAdminData";

const MessagesSupport = () => {
  const [messages, setMessages] = useState(mockMessagesSupport);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reply, setReply] = useState("");

  const totalConversations = messages.length;
  const openConversations = messages.filter((m) => m.status === "open").length;
  const inProgressConversations = messages.filter(
    (m) => m.status === "in-progress"
  ).length;
  const resolvedConversations = messages.filter(
    (m) => m.status === "resolved"
  ).length;

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (msgId, newStatus) => {
    setMessages(
      messages.map((msg) =>
        msg.id === msgId ? { ...msg, status: newStatus } : msg
      )
    );
  };

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    setShowModal(true);
    setReply("");
  };

  const handleSendReply = () => {
    if (!reply.trim()) return;
    setMessages(
      messages.map((msg) =>
        msg.id === selectedMessage.id
          ? {
              ...msg,
              messages: [
                ...msg.messages,
                {
                  sender: "admin",
                  text: reply,
                  time: new Date().toLocaleString(),
                },
              ],
              lastMessage: reply,
              lastUpdated: new Date().toLocaleString(),
            }
          : msg
      )
    );
    setReply("");
  };

  const handleDelete = (msgId) => {
    setMessages(messages.filter((msg) => msg.id !== msgId));
    setShowModal(false);
    setSelectedMessage(null);
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">
                Total Conversations
              </p>
              <p className="text-3xl font-bold text-white">
                {totalConversations}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                All
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Open</p>
              <p className="text-3xl font-bold text-white">
                {openConversations}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Open
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-white">
                {inProgressConversations}
              </p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                In Progress
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Resolved</p>
              <p className="text-3xl font-bold text-white">
                {resolvedConversations}
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Resolved
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover border-2 border-white/10"
                        src={msg.userAvatar}
                        alt={msg.user}
                      />
                      <span className="text-white font-semibold">
                        {msg.user}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white font-semibold">
                    {msg.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={msg.status}
                      onChange={(e) =>
                        handleStatusChange(msg.id, e.target.value)
                      }
                      className={`bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm ${
                        msg.status === "open"
                          ? "border-green-400/50"
                          : msg.status === "in-progress"
                          ? "border-yellow-400/50"
                          : "border-purple-400/50"
                      }`}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {msg.lastMessage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {msg.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      className="p-2 text-blue-400 hover:text-blue-300"
                      onClick={() => handleOpenMessage(msg)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(msg.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail/Reply Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-lg w-full">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                Conversation
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedMessage.userAvatar}
                  alt={selectedMessage.user}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="text-white font-semibold">
                    {selectedMessage.user}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {selectedMessage.subject}
                  </p>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {selectedMessage.messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        m.sender === "admin"
                          ? "bg-blue-400 text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <p className="text-sm">{m.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          m.sender === "admin"
                            ? "text-blue-900"
                            : "text-gray-400"
                        }`}
                      >
                        {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendReply()}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!reply.trim()}
                  className="px-4 py-2 bg-blue-400 text-black rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesSupport