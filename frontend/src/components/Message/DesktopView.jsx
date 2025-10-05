import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import DesktopSideBar from "./DesktopSideBar";
import DesktopChatHeader from "./DesktopChatHeader";
import DesktopMessageArea from "./DesktopMessageArea";
import DesktopInputField from "./DesktopInputField";
import DesktopNotSelectedMessage from "./DesktopNotSelectedMessage";
dayjs.extend(relativeTime);

const DesktopView = ({
  filteredConversations,
  selectedConversation,
  findConv,
  onlineUsers,
  isTyping,
  newMessage,
  messagesContainerRef,
  messagesEndRef,
  userInfo,
  handleTyping,
  handleSendMessage,
  setSelectedConversation,
}) => {
  return (
    <>
      {/* Sidebar */}
      <DesktopSideBar
        filteredConversations={filteredConversations}
        selectedConversation={selectedConversation}
        onlineUsers={onlineUsers}
        setSelectedConversation={setSelectedConversation}
      />

      {/* Chat Area */}
      <div className="lg:col-span-2 h-[75vh] overflow-hidden backdrop-blur-md border border-white/10 rounded-2xl shadow-xl shadow-black/20 bg-white/5">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <DesktopChatHeader
              selectedConversation={selectedConversation}
              onlineUsers={onlineUsers}
              isTyping={isTyping}
            />

            {/* Messages */}
            <DesktopMessageArea
              selectedConversation={selectedConversation}
              findConv={findConv}
              userInfo={userInfo}
              messagesContainerRef={messagesContainerRef}
              messagesEndRef={messagesEndRef}
            />

            {/* Message Input */}
            <DesktopInputField
              newMessage={newMessage}
              handleTyping={handleTyping}
              handleSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <DesktopNotSelectedMessage />
        )}
      </div>
    </>
  );
};

export default DesktopView;
