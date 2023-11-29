import React from "react";
import { Container } from "@mui/material";
import ChatWindow from "./ChatWindow";
import LayoutComponent from "../../common/Layout";

const ChatPage: React.FC = () => {
  return (
    <LayoutComponent>
      <Container maxWidth={"lg"}>
        <ChatWindow />
      </Container>
    </LayoutComponent>
  );
};

export default ChatPage;
