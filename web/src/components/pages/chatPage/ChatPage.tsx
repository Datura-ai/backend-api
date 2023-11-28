import React from "react";
import { Container } from "@mui/material";
import ChatWindow from "./ChatWindow";

const ChatPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-screen-lg bg-white">
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
