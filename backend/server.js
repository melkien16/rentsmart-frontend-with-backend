import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import UserRouter from "./routes/user.routes.js";
import ItemRouter from "./routes/item.routes.js";
import WalletRouter from "./routes/wallet.routes.js";
import BookingRouter from "./routes/booking.routes.js";
import SubscriptionRouter from "./routes/subscription.routes.js";
import CollateralRouter from "./routes/collaterall.routes.js";
import MessagesRouter from "./routes/message.routes.js";
import ReportRouter from "./routes/report.routes.js";
import ReviewRouter from "./routes/review.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import NotificationRouter from "./routes/notification.routes.js";
import PublicSubscriberRouter from "./routes/publicSubscriber.routes.js";
import SupportRouter from "./routes/support.routes.js";
import UploadRouter from "./routes/upload.routes.js";
import HelpRouter from "./routes/help.routes.js";
import RobotChatRouter from "./routes/robotChar.routes.js";
// import FaydaAuthRouter from "./routes/faydaAuth.routes.js";
import userSettingsRouter from "./routes/userSettings.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import test from "./routes/test.routes.js";
import path from "path";
import chatSocket from "./socket.js";

import connectDb from "./config/db.js";

// Load environment variables and connect to database
dotenv.config();
connectDb();

const app = express();

// Middleware for parsing JSON, URL-encoded data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/users", UserRouter);
app.use("/api/items", ItemRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api/subscriptions", SubscriptionRouter);
app.use("/api/collaterals", CollateralRouter);
app.use("/api/messages", MessagesRouter);
app.use("/api/reports", ReportRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/notifications", NotificationRouter);
app.use("/api/upload", UploadRouter);
app.use("/api/support", SupportRouter);
app.use("/api/help", HelpRouter);
app.use("/api/robotchat", RobotChatRouter);
app.use("/api/subscribe", PublicSubscriberRouter);
app.use("/api/settings", userSettingsRouter);
app.use("/api/test", test);
// app.use("/api/fayda-auth", FaydaAuthRouter);

// Production-specific configuration
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // Serve static frontend files from frontend/dist
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

  // Serve uploads folder for static assets
  app.use("/uploads", express.static(path.resolve(__dirname, "Uploads")));

  app.get(/^(?!\/api|\/uploads).*/, (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "index.html"),
      (err) => {
        if (err) {
          console.error(`Error serving index.html: ${err.message}`);
          next(err);
        }
      }
    );
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Set up chat socket
chatSocket(io);

// Start the server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
