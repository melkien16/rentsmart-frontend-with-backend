import React from "react";
import { MessageSquare } from "lucide-react";

const DesktopNotSelectedMessage = () => {
  return (
    <div className="h-96 flex items-center justify-center">
      <div className="text-center">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-white text-lg font-semibold mb-2">
          Select a conversation
        </h3>
        <p className="text-gray-400">
          Choose a conversation from the list to start messaging
        </p>
      </div>
    </div>
  );
};

export default DesktopNotSelectedMessage;
