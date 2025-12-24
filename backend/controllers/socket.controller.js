import Message from "../models/messageModel.js";

// Map to track online users (userId -> Set of socketIds)
const onlineUsers = new Map();

const socketController = (io, socket) => {
  const userId = socket.user._id.toString();

  // Track multiple connections per user
  if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
  onlineUsers.get(userId).add(socket.id);

  // Join a private room for this user
  socket.join(`user:${userId}`);

  console.log(`✅ User connected: ${userId}`);
  io.emit("user:online", { userId }); // Notify everyone user is online

  // ------------------ EVENTS ------------------

  // Send message
  socket.on("message:send", async ({ receiver, message }, ack) => {
    try {
      const newMsg = new Message({ sender: userId, receiver, message });
      await newMsg.save();

      // Emit to receiver if online
      io.to(`user:${receiver}`).emit("message:receive", newMsg);

      // Update delivery status
      newMsg.isDelivered = true;
      newMsg.deliveredAt = new Date();
      await newMsg.save();

      if (ack) ack({ status: "ok", message: newMsg });
    } catch (err) {
      console.error("message:send error:", err.message);
      if (ack) ack({ status: "error", error: err.message });
    }
  });

  // Typing indicator
  socket.on("typing", ({ to, isTyping }) => {
    io.to(`user:${to}`).emit("typing", { from: userId, isTyping });
  });

  // Mark message as read
  socket.on("message:read", async ({ messageId }) => {
    try {
      const msg = await Message.findById(messageId);
      if (!msg) return;
      if (msg.receiver.toString() !== userId) return;

      msg.isRead = true;
      msg.readAt = new Date();
      await msg.save();

      io.to(`user:${msg.sender}`).emit("message:read", {
        messageId,
        readAt: msg.readAt,
      });
    } catch (err) {
      console.error("message:read error:", err.message);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    const sockets = onlineUsers.get(userId);
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        onlineUsers.delete(userId);
        console.log(`❌ User offline: ${userId}`);
        io.emit("user:offline", { userId });
      }
    }
  });
};

export default socketController;
