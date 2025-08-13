import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userWalletInfo: localStorage.getItem("walletInfo") // ✅ same key
    ? JSON.parse(localStorage.getItem("walletInfo"))
    : null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletInfo: (state, action) => {
      state.userWalletInfo = action.payload;
      localStorage.setItem("walletInfo", JSON.stringify(action.payload)); // ✅ same key
    },
    clearUserWalletInfo: (state) => {
      state.userWalletInfo = null;
      localStorage.removeItem("walletInfo"); // ✅ same key
    },
  },
});

export const { setWalletInfo, clearUserWalletInfo } = walletSlice.actions; // ✅ corrected export name
export default walletSlice.reducer;
