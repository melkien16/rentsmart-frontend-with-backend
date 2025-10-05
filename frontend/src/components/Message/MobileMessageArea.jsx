import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MobileMessageArea = ({
  selectedConversation,
  messagesContainerRef,
  messagesEndRef,
  findConv,
  userInfo,
}) => {
  return (
    <div
      className="h-[65vh] overflow-y-auto p-4 space-y-4"
      ref={messagesContainerRef}
    >
      {findConv[0].conversations.map((message) => (
        <div
          key={`${message._id}-${selectedConversation.conversationId}`}
          className={`flex ${
            message.sender === userInfo._id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === userInfo._id
                ? "bg-gradient-to-r from-emerald-200 to-emerald-400 text-black rounded-br-md"
                : "bg-gradient-to-r from-white/10 to-white/5 text-white rounded-bl-md border border-white/10"
            }`}
          >
            <p className="text-sm">
              {typeof message.message === "object"
                ? JSON.stringify(message.message)
                : message.message}
            </p>
            <p
              className={`text-xs mt-1 ${
                message.sender === userInfo._id
                  ? "text-black/60"
                  : "text-emerald-400/50"
              }`}
            >
              {dayjs(message.createdAt).format("HH : mm a")}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MobileMessageArea;
