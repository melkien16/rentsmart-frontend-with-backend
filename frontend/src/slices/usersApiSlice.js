import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "User",
        "Wallet",
        "Booking",
        "Review",
        "Notification",
        "Item",
      ],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "User",
        "Wallet",
        "Booking",
        "Review",
        "Notification",
        "Item",
      ],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: [
        "User",
        "Wallet",
        "Booking",
        "Review",
        "Notification",
        "Item",
      ],
    }),
    getUserPublicById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/public/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserPublicByIdQuery,
} = userApiSlice;
