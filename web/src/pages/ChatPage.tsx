import React from "react";

// Styles
import "../components/chat/style.scss";

// Components
import ChatWindow from "../components/chat/ChatWindow";
import { Header } from "../components/common";

export const ChatPage: React.FC = () => {
  return (
    <div className="chat-page">
      <Header />
      <main>
        <ChatWindow />
      </main>
    </div>
  );
};
