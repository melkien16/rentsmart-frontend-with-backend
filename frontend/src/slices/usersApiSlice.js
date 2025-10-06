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
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserPublicById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/public/${id}`,
        method: "GET",
      }),
    }),
    getUserPublicByEmail: builder.query({
      query: (email) => ({
        url: `${USERS_URL}/email`,
        method: "GET",
        params: { email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserPublicByIdQuery,
  useGetUserPublicByEmailQuery,
  useGetUserProfileQuery,
} = userApiSlice;
