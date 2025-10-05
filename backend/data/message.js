//isDelivered, deliveredAt, readAt
const messages = [
  {
    sender: "689aa5de797dfb5254ac4d17",
    receiver: "689aa5de797dfb5254ac4d18",
    message: "Hello, how are you?",
    isRead: false,
    isDelivered: true,
    deliveredAt: new Date(),
    readAt: null,
  },
  {
    sender: "689aa5de797dfb5254ac4d17",
    receiver: "689aa5de797dfb5254ac4d18",
    message: "I'm good, thanks! How about you?",
    isRead: true,
    isDelivered: true,
    deliveredAt: new Date(),
    readAt: new Date(),
  },
];

export default messages;
