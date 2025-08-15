import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import walletSliceReducer from "./slices/walletSlice";
import bookingSliceReducer from "./slices/bookingSlice"; // Import the booking slice

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    wallet: walletSliceReducer,
    booking: bookingSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
