import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import walletSliceReducer from "./slices/walletSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    wallet: walletSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
