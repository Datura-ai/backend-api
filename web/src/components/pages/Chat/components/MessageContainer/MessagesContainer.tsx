import React from "react";
import Message from "../../../../../types/Message";
import MessageItem from "./MessageItem";
import { Box, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useMessageContainer } from "./useMessageContainer";

interface MessagesContainerProps {
  messages: Message[];
}
const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages }) => {
  const { messagesEndRef, handleScroll, showScrollButton, scrollToBottom } =
    useMessageContainer({ messages });

  return (
    <Box
      ref={messagesEndRef}
      onScroll={handleScroll}
      sx={{
        height: `calc(100% - 110px)`,
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <Box sx={{ overflow: "auto", flexGrow: 1, padding: "10px" }}>
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </Box>
      {showScrollButton && (
        <IconButton
          onClick={scrollToBottom}
          sx={{ position: "sticky", bottom: 0, left: "50%" }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default MessagesContainer;
