import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowLeft, MoreHorizontal, Phone, Video } from "lucide-react";

dayjs.extend(relativeTime);

const MobileChatHeader = ({
  selectedConversation,
  handleBackToSidebar,
  isTyping,
  onlineUsers,
}) => {
  return (
    <div className="p-4 border-b border-white/40 bg-black/10 shadow-md">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBackToSidebar}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="relative">
            {selectedConversation.otherUserInfo.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold">
              {selectedConversation.otherUserInfo.name}
            </h3>
            <p className="text-gray-400 text-sm">
              {isTyping ? (
                <span>
                  typing
                  <span className="animate-pulse">...</span>
                </span>
              ) : onlineUsers.includes(
                  selectedConversation.otherUserInfo?._id
                ) ? (
                "Online"
              ) : (
                `Last seen ${dayjs(
                  selectedConversation.otherUserInfo.lastSeen
                ).fromNow()}`
              )}
            </p>
          </div>
        </div>
        <div className="flex">
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
  );
};

export default MobileChatHeader;
