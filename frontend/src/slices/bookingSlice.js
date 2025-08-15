import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: localStorage.getItem("booking")
    ? JSON.parse(localStorage.getItem("booking"))
    : null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.booking = action.payload;
      localStorage.setItem("booking", JSON.stringify(action.payload));
    },
    clearBooking: (state) => {
      state.booking = null;
      localStorage.removeItem("booking");
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
