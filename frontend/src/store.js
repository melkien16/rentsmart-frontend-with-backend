import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import walletSliceReducer from "./slices/walletSlice";
import bookingSliceReducer from "./slices/bookingSlice"; // Import the booking slice
import socketSliceReducer from "./slices/socketSlice"; // Import the socket slice
import messagesSliceReducer from "./slices/messagesSlice"; // Import the messages slice
import allUserConversationsReducer from "./slices/allMessagesSlice";
import allConversationsReducer from "./slices/messageSlices";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    wallet: walletSliceReducer,
    booking: bookingSliceReducer,
    socket: socketSliceReducer,
    messages: messagesSliceReducer, // Add the messages slice
    allUserConversations: allUserConversationsReducer,
    allConversations: allConversationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
