import { io } from "socket.io-client";

let socket;

export const initSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: { token }, // optional if you use auth
      autoConnect: false,
    });
  }
  return socket;
};

export const getSocket = () => socket;
