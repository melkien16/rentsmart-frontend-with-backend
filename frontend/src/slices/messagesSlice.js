import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: {}, // key: conversationId, value: array of messages
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const msg = action.payload;
      const convId = msg.conversation; // backend sets this dynamically

      if (!state.conversations[convId]) {
        state.conversations[convId] = [];
      }

      state.conversations[convId].push(msg);
    },

    updateMessageStatus: (state, action) => {
      const { messageId, status, conversationId } = action.payload;
      if (state.conversations[conversationId]) {
        const msg = state.conversations[conversationId].find(
          (m) => m._id === messageId
        );
        if (msg) msg.status = status;
      }
    },

    setMessagesForConversation: (state, action) => {
      const { conversationId, messages } = action.payload;
      state.conversations[conversationId] = messages;
    },

    allConversations: (state, action) => {
      const { conversations } = action.payload;
      state.conversations = conversations.reduce((acc, conv) => {
        acc[conv.conversationId] = conv.messages;
        return acc;
      }, {});
    },

    // ✅ New reducer for bulk read
    markConversationRead: (state, action) => {
      const { conversationId } = action.payload;
      if (state.conversations[conversationId]) {
        state.conversations[conversationId] = state.conversations[
          conversationId
        ].map((msg) => ({
          ...msg,
          status: "read",
        }));
      }
    },
  },
});

export const {
  addMessage,
  updateMessageStatus,
  setMessagesForConversation,
  markConversationRead,
  allConversations,
} = messagesSlice.actions;

export default messagesSlice.reducer;
