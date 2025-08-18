import { apiSlice } from "./apiSlice";
import { BOOKING_URL } from "../constants";

const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookingForOwner: builder.query({
      query: () => ({
        url: `${BOOKING_URL}/owner`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getBookingForUser: builder.query({
      query: (userId) => ({
        url: `${BOOKING_URL}/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getBookings: builder.query({
      query: () => ({
        url: `${BOOKING_URL}/user`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: BOOKING_URL,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status, code }) => ({
        url: `${BOOKING_URL}/${id}/status`,
        method: "PUT",
        body: { status, code },
      }),
      invalidatesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetBookingForOwnerQuery,
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingForUserQuery,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
} = bookingApiSlice;

export default bookingApiSlice;
