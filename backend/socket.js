// chatSocket.js
import User from "./models/userModel.js";
import Message from "./models/messageModel.js";

let onlineUsers = new Map(); // userId -> Set(socketIds)

const addUserSocket = (userId, socketId) => {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }
  onlineUsers.get(userId).add(socketId);
};

const removeUserSocket = (userId, socketId) => {
  if (onlineUsers.has(userId)) {
    const sockets = onlineUsers.get(userId);
    sockets.delete(socketId);
    if (sockets.size === 0) {
      onlineUsers.delete(userId);
    }
  }
};

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    // User joins after login
    socket.on("join", async (userId) => {
      addUserSocket(userId, socket.id);

      if (onlineUsers.get(userId).size === 1) {
        await User.findByIdAndUpdate(userId, { isOnline: true });
        io.emit("onlineUsers", [...onlineUsers.keys()]);
      }
    });

    // Typing
    socket.on("typing", ({ sender, receiver }) => {
      const conversationId = [sender, receiver].sort().join("_");
      const receiverSockets = onlineUsers.get(receiver);
      if (receiverSockets) {
        receiverSockets.forEach((sid) =>
          io.to(sid).emit("userTyping", { sender, conversationId })
        );
      }
    });

    socket.on("stopTyping", ({ sender, receiver }) => {
      const conversationId = [sender, receiver].sort().join("_");
      const receiverSockets = onlineUsers.get(receiver);
      if (receiverSockets) {
        receiverSockets.forEach((sid) =>
          io.to(sid).emit("userStopTyping", { sender, conversationId })
        );
      }
    });

    // Send Message
    socket.on(
      "sendMessage",
      async ({ senderId, receiverId, message, conversationId }) => {
        try {
          // Create message with sender
          let msg = await Message.create({
            sender: senderId,
            receiver: receiverId,
            message,
            status: "sent",
          });

          msg = msg.toObject();
          msg.conversationId = conversationId;

          const receiverSockets = onlineUsers.get(receiverId);

          if (receiverSockets) {
            msg.status = "delivered";
            await Message.findByIdAndUpdate(msg._id, { status: "delivered" });

            receiverSockets.forEach((sid) =>
              io.to(sid).emit("receiveMessage", msg)
            );

            socket.emit("messageStatus", {
              messageId: msg._id,
              conversationId,
              status: "delivered",
            });
          } else {
            socket.emit("messageStatus", {
              messageId: msg._id,
              conversationId,
              status: "sent",
            });
          }
        } catch (err) {
          console.error("Error sending message:", err.message);
          socket.emit("messageError", { error: err.message });
        }
      }
    );

    // Mark as delivered
    socket.on(
      "messageDelivered",
      async ({ messageId, senderId, receiverId, conversationId }) => {
        // const conversationId = [senderId, receiverId].sort().join("_");
        const msg = await Message.findByIdAndUpdate(
          messageId,
          { status: "delivered" },
          { new: true }
        );
        if (!msg) return;

        const senderSockets = onlineUsers.get(msg.sender.toString());
        if (senderSockets) {
          senderSockets.forEach((sid) =>
            io.to(sid).emit("messageStatus", {
              messageId,
              conversationId,
              status: "delivered",
            })
          );
        }
      }
    );

    // Mark single message as read
    socket.on(
      "messageRead",
      async ({ messageId, senderId, receiverId, conversationId }) => {
        // const conversationId = [senderId, receiverId].sort().join("_");
        const msg = await Message.findByIdAndUpdate(
          messageId,
          { status: "read" },
          { new: true }
        );
        if (!msg) return;

        const senderSockets = onlineUsers.get(msg.sender.toString());
        if (senderSockets) {
          senderSockets.forEach((sid) =>
            io.to(sid).emit("messageStatus", {
              messageId,
              conversationId,
              status: "read",
            })
          );
        }
      }
    );

    // Mark conversation as read
    socket.on(
      "conversationRead",
      async ({ senderId, receiverId, readerId, conversationId }) => {
        // const conversationId = [senderId, receiverId].sort().join("_");

        await Message.updateMany(
          { sender: senderId, receiver: readerId, status: { $ne: "read" } },
          { status: "read" }
        );

        socket.emit("conversationReadAck", { conversationId });
      }
    );

    // Disconnect
    socket.on("disconnect", async () => {
      for (let [userId, sockets] of onlineUsers.entries()) {
        if (sockets.has(socket.id)) {
          removeUserSocket(userId, socket.id);

          if (!onlineUsers.has(userId)) {
            await User.findByIdAndUpdate(userId, {
              isOnline: false,
              lastSeen: new Date(),
            });
            io.emit("onlineUsers", [...onlineUsers.keys()]);
          }
          break;
        }
      }
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

export default chatSocket;
