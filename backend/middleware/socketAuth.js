import jwt from "jsonwebtoken";

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      console.warn("Socket authentication failed: No token provided");
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to socket
    socket.user = { _id: decoded.id };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.warn("Socket authentication failed: Token expired");
      return next(new Error("Authentication error: Token expired"));
    }
    console.warn("Socket authentication failed:", err.message);
    return next(new Error("Authentication error: Invalid token"));
  }
};

export default socketAuth;
