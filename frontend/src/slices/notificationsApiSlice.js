import { apiSlice } from "./apiSlice";
import { NOTIFICATIONS_URL } from "../constants";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: NOTIFICATIONS_URL,
        method: "GET",
      }),
      providesTags: ["Notification", "User", "Booking", "Review", "Item"],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATIONS_URL}/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification", "User", "Booking", "Review", "Item"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification", "User", "Booking", "Review", "Item"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useDeleteNotificationMutation,
} = notificationsApiSlice;
