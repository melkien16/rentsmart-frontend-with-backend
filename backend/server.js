import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

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
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

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

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
