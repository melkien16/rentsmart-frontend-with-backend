import { apiSlice } from "./apiSlice";
import { BOOKING_URL } from "../constants";
import { createBooking } from "../../../backend/controllers/booking.controller";
import { get } from "mongoose";

const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookingForOwner: builder.query({
      query: () => ({
        url: `${BOOKING_URL}/owner`,
        method: "GET",
      }),
    }),
    getBookingForUser: builder.query({
      query: (userId) => ({
        url: `${BOOKING_URL}/user/${userId}`,
        method: "GET",
      }),
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: BOOKING_URL,
        method: "POST",
        body: bookingData, // Assuming bookingData contains all necessary fields
      }),
    }),
  }),
});

export const { useGetBookingForOwnerQuery, useCreateBookingMutation } = bookingApiSlice;
export default bookingApiSlice;
