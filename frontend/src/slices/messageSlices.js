import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allConversations: [], // Array of { conversationId, conversations: [], otherUserInfo : {}, lastMessageInfo: {} }
};

const allConversationsSlice = createSlice({
  name: "allUserConversations",
  initialState,
  reducers: {
    setAllConversations: (state, action) => {
      state.allConversations = action.payload;
    },

    addNewConversation: (state, action) => {
      const newConv = action.payload;
      const exists = state.allConversations.find(
        (conv) => conv.conversationId === newConv.conversationId
      );
      if (!exists) {
        state.allConversations.unshift(newConv);
      } else {
        state.allConversations = state.allConversations.filter(
          (conv) => conv.conversationId !== newConv.conversationId
        );
        state.allConversations.unshift(exists);
      }
    },

    // Add a new message to the appropriate conversation
    addMessageToConversation: (state, action) => {
      const msg = action.payload;
      const convId = msg.conversationId; // backend sets this dynamically

      let selectedConversation = state.allConversations.find(
        (conv) => conv.conversationId === convId
      );

      if (selectedConversation) {
        selectedConversation.conversations.push(msg);
        selectedConversation.lastMessageInfo = msg;
      } else {
        // If conversation doesn't exist, create a new one
        state.allConversations.push({
          conversationId: convId,
          conversations: [msg],
          otherUserInfo: {}, // This would ideally be fetched or passed in
          lastMessageInfo: msg,
        });
      }
    },
  },
});

export const { setAllConversations, addMessageToConversation, addNewConversation } =
  allConversationsSlice.actions;

export default allConversationsSlice.reducer;
