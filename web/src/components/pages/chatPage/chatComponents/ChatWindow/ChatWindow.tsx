import React from "react";
import { Box } from "@mui/material";
import MessagesContainer from "../MessageContainer";

import InputBar from "../InputBar";
import { useChatWindow } from "./useChatWindow";

const ChatWindow: React.FC = () => {
  const { messages, handleSendMessage, inputEnabled, mode, setMode } =
    useChatWindow();

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <MessagesContainer messages={messages} />
      <InputBar
        onSendMessage={handleSendMessage}
        enabled={inputEnabled}
        mode={mode}
        setMode={setMode}
      />
    </Box>
  );
};

export default ChatWindow;
