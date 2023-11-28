import React, { useEffect, useRef, useState } from "react";
import Message from "../../../types/Message";
import MessageItem from "./MessageItem";
import { Box, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface MessagesContainerProps {
  messages: Message[];
}
const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (!messagesEndRef.current) return;

    const isAtBottom =
      messagesEndRef.current.scrollHeight - messagesEndRef.current.scrollTop ===
      messagesEndRef.current.clientHeight;
    setShowScrollButton(!isAtBottom);
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <Box
      ref={messagesEndRef}
      onScroll={handleScroll}
      sx={{
        height: `77vh`,
        overflowY: "auto",
        padding: "16px 0 16px 16px",
        '&::-webkit-scrollbar': {
          width: '0.75em',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'darkgrey',
        },
      }}
    >
      <Box sx={{ overflow: "auto", flexGrow: 1, padding: "16px" }}>
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </Box>
      {showScrollButton && (
        <IconButton
          onClick={scrollToBottom}
          color="info"
          size="small"
          sx={{ position: "sticky", bottom: 0, left: "50%" }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default MessagesContainer;
