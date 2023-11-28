import React from "react";
import { Container } from "@mui/material";
import ChatWindow from "./components/ChatWindow";

const ChatPage: React.FC = () => {
  return (
    <Container maxWidth={"lg"}>
      <ChatWindow />
    </Container>
  );
};

export default ChatPage;
