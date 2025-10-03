import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUserConversations: [],
};

const allUserConversationsSlice = createSlice({
  name: "allUserConversations",
  initialState,
  reducers: {
    // Set the whole list from backend
    setAllUserConversations: (state, action) => {
      state.allUserConversations = action.payload;
    },

    // Add/update a conversation with a new message
    updateConversationById: (state, action) => {
      const { conversationId, newMessage } = action.payload;

      const existingConversation = state.allUserConversations.find(
        (c) => c.conversationId === conversationId
      );

      if (existingConversation) {
        // append the new message
        existingConversation.conversations.push(newMessage);

        // update last message info
        existingConversation.lastMessageInfo = newMessage;

        // move this conversation to top (like WhatsApp/Telegram UI)
        state.allUserConversations = [
          existingConversation,
          ...state.allUserConversations.filter(
            (c) => c.conversationId !== conversationId
          ),
        ];
      } else {
        // if conversation doesn’t exist yet, create it
        state.allUserConversations.unshift({
          conversationId,
          conversations: [newMessage],
          otherUserInfo: newMessage.otherUserInfo || null,
          lastMessageInfo: newMessage,
        });
      }
    },
  },
});

export const { setAllUserConversations, updateConversationById } =
  allUserConversationsSlice.actions;

export default allUserConversationsSlice.reducer;
