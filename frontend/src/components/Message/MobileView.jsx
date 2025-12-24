import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageSquare } from "lucide-react";

import MobileConversationList from "./MobileConversationList";
import MobileChatHeader from "./MobileChatHeader";
import MobileMessageArea from "./MobileMessageArea";
import MobileInput from "./MobileInput";

dayjs.extend(relativeTime);

const MobileView = ({
  filteredConversations,
  selectedConversation,
  setSelectedConversation,
  onlineUsers,
  isTyping,
  messagesContainerRef,
  messagesEndRef,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleBackToSidebar,
  findConv,
  userInfo,
  handleTyping
}) => {
  return (
    <>
      {!selectedConversation ? (
        <MobileConversationList
          filteredConversations={filteredConversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          onlineUsers={onlineUsers}
        />
      ) : (
        <div className="lg:col-span-2 bg-gradient-to-r from-emerald-400/10 to-emerald-400/20 border border-white/10 overflow-hidden min-h-[85vh] h-full">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <MobileChatHeader
                selectedConversation={selectedConversation}
                handleBackToSidebar={handleBackToSidebar}
                isTyping={isTyping}
                onlineUsers={onlineUsers}
              />

              {/* Messages */}
              <MobileMessageArea
                selectedConversation={selectedConversation}
                messagesContainerRef={messagesContainerRef}
                messagesEndRef={messagesEndRef}
                findConv={findConv}
                userInfo={userInfo}
              />

              {/* Message Input */}
              <MobileInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                handleTyping={handleTyping}
              />
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
      )}
    </>
  );
};

export default MobileView;
