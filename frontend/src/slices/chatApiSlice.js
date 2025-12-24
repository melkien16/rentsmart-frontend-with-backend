import { apiSlice } from "./apiSlice";
import { MESSAGE_URL } from "../constants";

export const chatApi =  apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all conversations
    getConversations: builder.query({
      query: () => MESSAGE_URL,
      providesTags: ["Conversation", "Message"],
    }),

    // Fetch messages by conversationId
    getMessages: builder.query({
      query: (conversationId) => `${MESSAGE_URL}/conversation/${conversationId}`,
      providesTags: (result, error, conversationId) => [
        "Conversation", "Message",
      ],
    }),

    // Send new message
    sendMessage: builder.mutation({
      query: ({ receiver, message }) => ({
        url: MESSAGE_URL,
        method: "POST",
        body: { receiver, message },
      }),
      invalidatesTags: ["Conversation", "Message"],
    }),

    // Mark conversation as read
    markAsRead: builder.mutation({
      query: ({ conversationId }) => ({
        url: `${MESSAGE_URL}/${conversationId}/read`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { conversationId }) => [
        "Conversation", "Message",
      ],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} = chatApi;
