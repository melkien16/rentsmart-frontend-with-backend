// src/hooks/useChat.js
import { useEffect, useState } from "react";
import { getSocket, initSocket } from "../socket";
import {
  useGetMessagesByUserQuery,
  useSendMessageMutation,
} from "../slices/messagesApiSlice";

export const useChat = (otherUserId, token) => {
  const socket = initSocket(token);

  // Fetch existing messages
  const { data: messages = [], refetch } =
    useGetMessagesByUserQuery(otherUserId);

  const [sendMessageMutation] = useSendMessageMutation();

  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Set());

  useEffect(() => {
    // Listen for real-time events
    socket.on("message:receive", (msg) => {
      if (msg.sender === otherUserId || msg.receiver === otherUserId) {
        refetch();
      }
    });

    socket.on("user:online", ({ userId }) => {
      setOnlineUsers((prev) => new Set(prev.add(userId)));
    });

    socket.on("user:offline", ({ userId }) => {
      setOnlineUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(userId);
        return updated;
      });
    });

    socket.on("typing", ({ from, isTyping }) => {
      setTypingUsers((prev) => {
        const updated = new Set(prev);
        if (isTyping) updated.add(from);
        else updated.delete(from);
        return updated;
      });
    });

    return () => {
      socket.off("message:receive");
      socket.off("user:online");
      socket.off("user:offline");
      socket.off("typing");
    };
  }, [otherUserId, socket, refetch]);

  const sendMessage = async (message) => {
    // Send via REST
    await sendMessageMutation({ receiver: otherUserId, message });
    // Send via socket for immediate delivery
    socket.emit("message:send", { receiver: otherUserId, message });
  };

  const sendTyping = (isTyping) => {
    socket.emit("typing", { to: otherUserId, isTyping });
  };

  const isOtherUserOnline = onlineUsers.has(otherUserId);
  const isOtherUserTyping = typingUsers.has(otherUserId);

  return {
    messages,
    sendMessage,
    sendTyping,
    isOtherUserOnline,
    isOtherUserTyping,
  };
};
