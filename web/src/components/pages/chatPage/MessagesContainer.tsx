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
    <div
      ref={messagesEndRef}
      onScroll={handleScroll}
      className="flex flex-col w-full px-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div className="overflow-auto w-full flex-grow px-2.5">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="sticky bottom-0 left-1/2 transform -translate-x-1/2"
        >
          {/* Replace with an appropriate arrow down icon or SVG */}
          <svg className="w-6 h-6" /* ... */></svg>
        </button>
      )}
    </div>
  );
};

export default MessagesContainer;
