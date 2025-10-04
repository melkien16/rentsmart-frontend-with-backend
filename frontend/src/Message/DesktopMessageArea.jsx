import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Check, CheckCheck } from "lucide-react";

dayjs.extend(relativeTime);

const DesktopMessageArea = ({
  selectedConversation,
  findConv,
  userInfo,
  messagesContainerRef,
  messagesEndRef,
}) => {
  return (
    <div
      className="h-[80%] overflow-y-auto p-4 space-y-4"
      ref={messagesContainerRef}
    >
      {findConv[0].conversations.map((message) => (
        <div
          key={`${message._id}-${selectedConversation.id}`}
          className={`flex ${
            message.sender === userInfo._id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl rounded-br-none ${
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
            <div className="flex gap-2 items-center">
              <p
                className={`text-xs mt-1 ${
                  message.sender === userInfo._id
                    ? "text-black/60"
                    : "text-emerald-400/50"
                }`}
              >
                {dayjs(message.createdAt).format("HH : mm a")}
              </p>
              {message.sender == userInfo._id && (
                <p>
                  {message.status === "sent" ? (
                    <Check className="w-4 h-4 text-gray-400" />
                  ) : message.status === "delivered" ||
                    message.status === "read" ? (
                    <CheckCheck className="w-4 h-4 text-gray-400" />
                  ) : null}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default DesktopMessageArea;
