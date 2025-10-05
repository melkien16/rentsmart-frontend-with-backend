import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useGetAllMessagesQuery } from "../../slices/messagesApiSlice";
import {
  setAllConversations,
  addMessageToConversation,
} from "../../slices/messageSlices";

import { Navbar } from "../navBar/Navbar";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";
import { getSocket } from "../../socket";

dayjs.extend(relativeTime);

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { typingUsers, onlineUsers } = useSelector((state) => state.socket);

  const typingTimeout = useRef(null);
  const dispatch = useDispatch();

  const socket = getSocket();
  const conversationId = selectedConversation?.conversationId;
  const isTyping = typingUsers.hasOwnProperty(conversationId);

  const { data: messagesData, isLoading, error } = useGetAllMessagesQuery();

  useEffect(() => {
    if (messagesData) {
      dispatch(setAllConversations(messagesData));
    }
  }, [messagesData, dispatch]);

  const { allConversations } = useSelector((state) => state.allConversations);
  const { userInfo } = useSelector((state) => state.auth);

  const filteredConversations =
    allConversations?.filter((conv) =>
      (conv.otherUserInfo.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || [];

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    socket.emit("typing", {
      sender: userInfo._id,
      receiver: selectedConversation.otherUserInfo._id,
    });

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        sender: userInfo._id,
        receiver: selectedConversation.otherUserInfo._id,
      });
    }, 2000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const messagePayload = {
        sender: userInfo._id,
        receiver: selectedConversation.otherUserInfo._id,
        message: newMessage.trim(),
        conversationId,
      };

      dispatch(
        addMessageToConversation({
          ...messagePayload,
          createdAt: new Date().toISOString(),
          status: "sent",
        })
      );

      socket.emit("sendMessage", {
        senderId: userInfo._id,
        receiverId: selectedConversation.otherUserInfo._id,
        message: newMessage.trim(),
        conversationId,
      });

      socket.emit("stopTyping", {
        sender: userInfo._id,
        receiver: selectedConversation.otherUserInfo._id,
        conversationId,
      });

      setTimeout(scrollToBottom, 100);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      if (msg.conversationId === conversationId) {
        dispatch(
          addMessageToConversation({
            ...msg,
            createdAt: new Date().toISOString(),
          })
        );
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, conversationId, dispatch]);

  // Handle window resize for mobile view
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Handle back to sidebar in mobile view
  const handleBackToSidebar = () => {
    setSelectedConversation(null);
  };

  let findConv;
  if (selectedConversation) {
    findConv = allConversations.filter(
      (conv) => conv.conversationId == conversationId
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 ">
      <Navbar />
      <div className="w-full max-w-[95%] min-h-screen mx-auto py-8 pt-24 space-y-6">
        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}

          {!isMobileView && (
            <DesktopView
              filteredConversations={filteredConversations}
              selectedConversation={selectedConversation}
              findConv={findConv}
              onlineUsers={onlineUsers}
              isTyping={isTyping}
              newMessage={newMessage}
              messagesContainerRef={messagesContainerRef}
              messagesEndRef={messagesEndRef}
              userInfo={userInfo}
              handleTyping={handleTyping}
              handleSendMessage={handleSendMessage}
              setSelectedConversation={setSelectedConversation}
            />
          )}

          {/* Mobile View */}
          {isMobileView && (
            <MobileView
              filteredConversations={filteredConversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              onlineUsers={onlineUsers}
              isTyping={isTyping}
              messagesContainerRef={messagesContainerRef}
              messagesEndRef={messagesEndRef}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              handleBackToSidebar={handleBackToSidebar}
              findConv={findConv}
              userInfo={userInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
