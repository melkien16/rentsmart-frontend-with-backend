let ioInstance = null;

export const initIO = (io) => {
  ioInstance = io;
};

export const getIO = () => {
  if (!ioInstance) throw new Error("Socket.IO not initialized");
  return ioInstance;
};
