import { apiSlice } from "./apiSlice";
import { MESSAGE_URL } from "../constants";

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all messages received by the logged-in user
    getAllMessages: builder.query({
      query: () => ({
        url: MESSAGE_URL,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    // Fetch messages between logged-in user and another user
    getMessagesByUser: builder.query({
      query: (userId) => ({
        url: `${MESSAGE_URL}/${userId}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    // Send a new message
    sendMessage: builder.mutation({
      query: ({ receiver, message }) => ({
        url: MESSAGE_URL,
        method: "POST",
        body: { receiver, message },
      }),
      invalidatesTags: [{ type: "Message", id: "LIST" }],
    }),

    // Mark message as read
    markMessageAsRead: builder.mutation({
      query: (messageId) => ({
        url: `${MESSAGE_URL}/${messageId}/read`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, messageId) => [
        { type: "Message", id: messageId },
      ],
    }),
    // Start a conversation (create a new message)
    startConversation: builder.mutation({
      query: ({ receiver, message }) => ({
        url: `${MESSAGE_URL}/start`,
        method: "POST",
        body: { receiver, message },
      }),
      invalidatesTags: [{ type: "Message", id: "LIST" }],
    }),

    // Delete a message
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `${MESSAGE_URL}/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Message", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetMessagesByUserQuery,
  useSendMessageMutation,
  useMarkMessageAsReadMutation,
  useDeleteMessageMutation,
} = messagesApiSlice;
