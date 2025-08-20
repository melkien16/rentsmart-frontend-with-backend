// src/slices/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "Item",
    "User",
    "Booking",
    "Review",
    "Notification",
    "Category",
    "Wallet",
    "Message", // ✅ Add messages as a tag type
    "Conversation",
  ],
  endpoints: (builder) => ({}),
});
