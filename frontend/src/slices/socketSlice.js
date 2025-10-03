import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
  typingUsers: {}, // now nested by conversationId
  messageStatuses: {},
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setUserTyping: (state, action) => {
      const { sender, conversationId } = action.payload;

      if (!conversationId) return; // safety

      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = {};
      }

      state.typingUsers[conversationId][sender] = true;
    },

    clearUserTyping: (state, action) => {
      const { sender, conversationId } = action.payload;

      // if (!conversationId) return;

      if (state.typingUsers[conversationId]) {
        delete state.typingUsers[conversationId][sender];

        // cleanup if empty
        if (Object.keys(state.typingUsers[conversationId]).length === 0) {
          delete state.typingUsers[conversationId];
        }
      }
    },

    updateMessageStatus: (state, action) => {
      const { messageId, status } = action.payload;
      state.messageStatuses[messageId] = status;
    },
  },
});

export const {
  setOnlineUsers,
  setUserTyping,
  clearUserTyping,
  updateMessageStatus,
} = socketSlice.actions;

export default socketSlice.reducer;
