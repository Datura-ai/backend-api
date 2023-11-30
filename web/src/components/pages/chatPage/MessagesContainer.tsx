import React, { useEffect, useRef, useState } from "react";
import Message from "../../../types/Message";
import MessageItem from "./MessageItem";
import { Box, IconButton, Typography, Stack, Paper, Grid } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaHandsHelping } from "react-icons/fa";
import { IoHelpOutline } from "react-icons/io5";

interface MessagesContainerProps {
  messages: Message[];
  mode?:any
}
const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages,mode }) => {
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
        height: "82vh",
        overflowY: "auto",
        border:"1px solid rgb(120, 120, 120)"
        

      }}
    >
      {messages?.length > 0 && (
        messages.map((message, index) => (
          <Box sx={{ overflow: "auto", flexGrow: 1, padding: "10px" }}>

            <MessageItem key={index} message={message} mode={mode}/>
          </Box>
        ))
      )}

      {showScrollButton && (
        <IconButton
          onClick={scrollToBottom}
          style={{cursor:"pointer"}}
          sx={{ cursor:"pointer", position: "sticky",left:"86%", bottom: 0,color:"#fff",
          '&:hover': {
            color:"#fff",
          },
          '&:active': {
            color:"#fff",
          }, 
        }}
        >
          <ArrowDownwardIcon sx={{cursor:"pointer" }}/>
        </IconButton>
      )}
    </Box>
  );
};

export default MessagesContainer;
