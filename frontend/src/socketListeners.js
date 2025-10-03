// src/socketListeners.js
import {
  setOnlineUsers,
  setUserTyping,
  clearUserTyping,
} from "./slices/socketSlice";
import { getSocket } from "./socket";
import {
  addMessage,
  updateMessageStatus,
  markConversationRead,
} from "./slices/messagesSlice";

export const registerSocketListeners = (store, userId) => {
  const socket = getSocket();
  if (!socket) return;

  // cleanup listeners to avoid duplicates
  socket.off("join");
  socket.off("onlineUsers");
  socket.off("userTyping");
  socket.off("userStopTyping");
  socket.off("messageStatus");
  socket.off("receiveMessage");
  socket.off("conversationReadAck");

  // join again (important after refresh!)
  socket.emit("join", userId);

  socket.on("onlineUsers", (users) => {
    store.dispatch(setOnlineUsers(users));
  });

  socket.on("userTyping", ({ sender, conversationId }) => {
    store.dispatch(setUserTyping({ sender, conversationId }));
  });

  socket.on("userStopTyping", ({ sender, conversationId }) => {
    store.dispatch(clearUserTyping({ sender, conversationId }));
  });

  socket.on("receiveMessage", (msg) => {
    store.dispatch(addMessage(msg));
  });

  socket.on("messageStatus", ({ messageId, status, conversationId }) => {
    store.dispatch(
      updateMessageStatus({
        messageId,
        status,
        conversationId,
      })
    );
  });

  // NEW: listen for conversationRead acknowledgement
  socket.on("conversationReadAck", ({ conversationId }) => {
    store.dispatch(markConversationRead({ conversationId }));
  });
};
