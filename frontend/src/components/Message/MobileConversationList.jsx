import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MobileConversationList = ({
  filteredConversations,
  selectedConversation,
  setSelectedConversation,
  onlineUsers,
}) => {
  return (
    <div className="lg:col-span-1 bg-white/5 border border-white/10 overflow-hidden min-h-[85vh] h-full">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">Conversations</h3>
      </div>
      <div className="overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.conversationId}
            className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/5 ${
              selectedConversation?.conversationId ===
              conversation.conversationId
                ? "bg-blue-400/10 border-blue-400/30"
                : ""
            }`}
            onClick={() => setSelectedConversation(conversation)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={conversation.otherUserInfo.avatar}
                  alt={conversation.otherUserInfo.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {onlineUsers.includes(conversation.otherUserInfo?._id) && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold truncate">
                    {conversation.otherUserInfo.name}
                  </h4>
                  <span className="text-gray-400 text-xs">
                    {dayjs(conversation.lastMessageInfo.createdAt).format(
                      "HH : mm a"
                    )}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${
                    !conversation.conversations.isRead
                      ? "text-white font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {conversation.lastMessageInfo.message || "last message"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileConversationList;
