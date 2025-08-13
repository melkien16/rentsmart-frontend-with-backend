import { apiSlice } from "./apiSlice";
import { BOOKING_URL } from "../constants";

const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookingForOwner: builder.query({
      query: () => ({
        url: `${BOOKING_URL}/owner`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBookingForOwnerQuery } = bookingApiSlice;
export default bookingApiSlice;