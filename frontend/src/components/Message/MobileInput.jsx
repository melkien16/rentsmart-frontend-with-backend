import React from "react";
import { Send } from "lucide-react";

const MobileInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleTyping,
}) => {
  return (
    <div className="p-4 border-t border-white/10">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping(e);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="px-4 py-2 bg-blue-400 text-black rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MobileInput;
