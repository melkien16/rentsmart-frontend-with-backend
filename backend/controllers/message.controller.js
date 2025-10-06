import asyncHandler from "../middleware/asyncHandler.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiver, message } = req.body;
  const sender = req.user._id;

  if (!receiver || !message) {
    res.status(400);
    throw new Error("Receiver and message are required");
  }

  const newMessage = new Message({
    sender,
    receiver,
    message,
  });

  await newMessage.save();
  res.status(201).json(newMessage);
});

// @desc    Get all conversations (with full messages) of a user
// @route   GET /api/messages
// @access  Private
const getAllMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const conversations = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { receiver: userId }],
      },
    },
    {
      // normalize sender/receiver to always form the same conversationId
      $addFields: {
        conversationId: {
          $cond: [
            {
              $gt: [{ $toString: "$sender" }, { $toString: "$receiver" }],
            },
            {
              $concat: [
                { $toString: "$receiver" },
                "_",
                { $toString: "$sender" },
              ],
            },
            {
              $concat: [
                { $toString: "$sender" },
                "_",
                { $toString: "$receiver" },
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: "$conversationId",
        messages: { $push: "$$ROOT" },
        lastMessage: { $last: "$$ROOT" },
      },
    },
    {
      $addFields: {
        otherUser: {
          $cond: [
            { $eq: [{ $arrayElemAt: ["$messages.sender", 0] }, userId] },
            { $arrayElemAt: ["$messages.receiver", 0] },
            { $arrayElemAt: ["$messages.sender", 0] },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "otherUser",
        foreignField: "_id",
        as: "otherUser",
      },
    },
    { $unwind: "$otherUser" },
    {
      $project: {
        _id: 0,
        otherUserInfo: {
          _id: "$otherUser._id",
          name: "$otherUser.name",
          avatar: "$otherUser.avatar",
          lastSeen: "$otherUser.lastSeen",
          isOnline: "$otherUser.isOnline",
        },
        conversations: "$messages",
        lastMessageInfo: "$lastMessage",
        conversationId: "$_id",
      },
    },
    { $sort: { "lastMessageInfo.createdAt": -1 } },
  ]);

  res.json(conversations);
});

// @desc    Get messages between two users by conversationId(userId_userId)
// @route   GET /api/messages/:conversationId
// @access  Private
const getConversationById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { conversationId } = req.params;

  // Extract the two user IDs from conversationId
  const [user1, user2] = conversationId.split("_");

  // Make sure the logged-in user is part of this conversation
  if (userId.toString() !== user1 && userId.toString() !== user2) {
    res.status(403);
    throw new Error("You are not part of this conversation");
  }

  // Fetch all messages between these two users
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  })
    .sort({ createdAt: 1 }) // sort by oldest first
    .select("-__v"); // remove __v if you want

  res.json(messages);
});

// @desc    Get messages between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const loggedInUserId = req.user._id;

  if (!userId || userId === loggedInUserId.toString()) {
    res.status(400);
    throw new Error("Invalid recipient");
  }

  // Pagination params (defaults: page 1, limit 20)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Fetch messages with pagination
  const messages = await Message.find({
    $or: [
      { sender: loggedInUserId, receiver: userId },
      { sender: userId, receiver: loggedInUserId },
    ],
  })
    .populate("sender", "name email isOnline avatar")
    .populate("receiver", "name email isOnline avatar")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  // Count total messages in this conversation
  const totalMessages = await Message.countDocuments({
    $or: [
      { sender: loggedInUserId, receiver: userId },
      { sender: userId, receiver: loggedInUserId },
    ],
  });

  res.json({
    messages,
    pagination: {
      total: totalMessages,
      page,
      limit,
      totalPages: Math.ceil(totalMessages / limit),
    },
  });
});

// @desc    Get a user profile by email to start a new conversation and return the same as getAllMessages
// @route   GET /api/messages/user?email=
// @access  Private
const getUserMessageByEmail = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const loggedInUserId = req.user._id;

  if (!email) {
    res.status(400);
    throw new Error("Email query parameter is required");
  }

  const user = await User.findOne({ email }).select(
    "_id name email avatar isOnline lastSeen"
  );

  console.log("Found user:", user);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user._id.toString() === loggedInUserId.toString()) {
    res.status(400);
    throw new Error("You cannot start a conversation with yourself");
  }

  // Check if there's already a conversation between the two users
  const conversationId =
    loggedInUserId.toString() > user._id.toString()
      ? `${user._id}_${loggedInUserId}`
      : `${loggedInUserId}_${user._id}`;

  const existingConversation = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }],
      },
    },
    {
      $addFields: {
        conversationId: {
          $cond: [
            {
              $gt: [{ $toString: "$sender" }, { $toString: "$receiver" }],
            },
            {
              $concat: [
                { $toString: "$receiver" },
                "_",
                { $toString: "$sender" },
              ],
            },
            {
              $concat: [
                { $toString: "$sender" },
                "_",
                { $toString: "$receiver" },
              ],
            },
          ],
        },
      },
    },
    {
      $match: { conversationId },
    },
    {
      $group: {
        _id: "$conversationId",
        messages: { $push: "$$ROOT" },
        lastMessage: { $last: "$$ROOT" },
      },
    },
    {
      $addFields: {
        otherUser: {
          $cond: [
            {
              $eq: [{ $arrayElemAt: ["$messages.sender", 0] }, loggedInUserId],
            },
            { $arrayElemAt: ["$messages.receiver", 0] },
            { $arrayElemAt: ["$messages.sender", 0] },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "otherUser",
        foreignField: "_id",
        as: "otherUser",
      },
    },
    { $unwind: "$otherUser" },
    {
      $project: {
        _id: 0,
        otherUserInfo: {
          _id: "$otherUser._id",
          name: "$otherUser.name",
          avatar: "$otherUser.avatar",
          lastSeen: "$otherUser.lastSeen",
          isOnline: "$otherUser.isOnline",
        },
        conversations: "$messages",
        lastMessageInfo: "$lastMessage",
        conversationId: "$_id",
      },
    },
  ]);

  if (existingConversation.length > 0) {
    return res.json(existingConversation[0]);
  } else {
    // No existing conversation, return user info with empty messages
    return res.json({
      otherUserInfo: user,
      conversations: [],
      lastMessageInfo: null,
      conversationId,
    });
  }
});

// @desc    Mark a message as read
// @route   PUT /api/messages/:id/read
// @access  Private
const markMessageAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  // Check if the logged-in user is the receiver
  if (message.receiver.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can only mark messages you received as read");
  }

  message.isRead = true;
  await message.save();

  res.json({ message: "Message marked as read", message });
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  // Check if the logged-in user is either the sender or receiver
  if (
    message.sender.toString() !== req.user._id.toString() &&
    message.receiver.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("You are not authorized to delete this message");
  }

  await message.remove();

  res.json({ message: "Message deleted" });
});

export {
  sendMessage,
  getMessages,
  getAllMessages,
  markMessageAsRead,
  getConversationById,
  deleteMessage,
  getUserMessageByEmail,
};
