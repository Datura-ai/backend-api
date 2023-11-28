import { useEffect, useRef, useState } from "react";
import Message from "../../../../../types/Message";

export const useMessageContainer = ({ messages }: { messages: Message[] }) => {
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

  return {
    messagesEndRef,
    handleScroll,
    showScrollButton,
    scrollToBottom,
  };
};
