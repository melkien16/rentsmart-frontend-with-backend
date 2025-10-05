import React from "react";
import { Phone, Video, MoreHorizontal } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const DesktopChatHeader = ({
  selectedConversation,
  onlineUsers,
  isTyping,
}) => {
  return (
    <div className="p-4 border-b border-white/20 bg-gradient-to-r from-emerald-400/10 to-emerald-400/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedConversation.otherUserInfo.avatar}
              alt={selectedConversation.otherUserInfo.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold">
              {selectedConversation.otherUserInfo.name}
            </h3>
            <div className="text-gray-400 text-sm">
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
            </div>
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
  );
};

export default DesktopChatHeader;
