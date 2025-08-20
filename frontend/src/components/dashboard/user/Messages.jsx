import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  MessageSquare,
  Phone,
  Video,
  Users,
  Bell,
  Wifi,
  Send,
} from "lucide-react";

import { mockMessagesData } from "../mockUserData";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = mockMessagesData.conversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-blue-400" />
              Messages
            </h2>
            <p className="text-gray-300 mt-2">
              Communicate with renters and manage conversations
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative md:block hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
            </div>
            <button className="px-6 py-2 bg-blue-400 text-black rounded-xl hover:bg-blue-500 transition-all duration-200 flex items-center gap-2 font-semibold">
              <Plus className="w-4 h-4" />
              New Message
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">
                Total Messages
              </p>
              <p className="text-3xl font-bold text-white">
                {mockMessagesData.totalMessages}
              </p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                Conversations
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl border border-red-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">
                Unread Messages
              </p>
              <p className="text-3xl font-bold text-white">
                {mockMessagesData.unreadCount}
              </p>
              <p className="text-red-400 text-sm flex items-center gap-1">
                <Bell className="w-4 h-4" />
                Need attention
              </p>
            </div>
            <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Active Conversations
              </p>
              <p className="text-3xl font-bold text-white">
                {mockMessagesData.conversations.length}
              </p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Users className="w-4 h-4" />
                Ongoing chats
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">
                Online Users
              </p>
              <p className="text-3xl font-bold text-white">
                {
                  mockMessagesData.conversations.filter((c) => c.user.online)
                    .length
                }
              </p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Wifi className="w-4 h-4" />
                Currently online
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div> */}

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white">Conversations</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/5 ${
                  selectedConversation?.id === conversation.id
                    ? "bg-blue-400/10 border-blue-400/30"
                    : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.user.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold truncate">
                        {conversation.user.name}
                      </h4>
                      <span className="text-gray-400 text-xs">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">
                      {conversation.item}
                    </p>
                    <p
                      className={`text-sm truncate ${
                        conversation.unread
                          ? "text-white font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={selectedConversation.user.avatar}
                        alt={selectedConversation.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConversation.user.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {selectedConversation.user.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {selectedConversation.item}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === "me"
                          ? "bg-blue-400 text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "me"
                            ? "text-blue-900"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-400 text-black rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-400">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages