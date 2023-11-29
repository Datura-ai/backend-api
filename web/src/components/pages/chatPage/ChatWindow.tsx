import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MessagesContainer from "./MessagesContainer";
import Message from "../../../types/Message";
import InputBar from "./InputBar";
import { fetchTextMessage, generateImage } from "../../../services/api";
import { EventSourceMessage } from "@microsoft/fetch-event-source";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [mode, setMode] = useState<"image" | "text">("text");
  const [inputEnabled, setInputEnabled] = useState<boolean>(true);

  const handleSendMessage = (newMessage: string) => {
    setMessages((prevState) => [
      ...prevState,
      { author: "user", text: newMessage, type: "text" },
    ]);

    switch (mode) {
      case "text":
        setMessages((prevState) => [
          ...prevState,
          {
            author: "bot",
            text: "",
            type: "text-loading",
          },
        ]);
        break;
      case "image":
        setMessages((prevState) => [
          ...prevState,
          { author: "bot", text: "", type: "image-loading" },
        ]);
        setInputEnabled(false);
        generateImage(newMessage)
          .then((data) => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              { author: "bot", text: data.data, type: "image" },
            ]);
          })
          .catch(() => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              {
                author: "bot",
                text: "Can't generate image. Please try again",
                type: "error",
              },
            ]);
          })
          .finally(() => {
            setInputEnabled(true);
          });
        break;
    }
  };

  useEffect(() => {
    const onopen = (res: Response) => {
      if (res.ok && res.status === 200) {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: "bot",
            text: "",
            type: "text",
          },
        ]);
        setInputEnabled(false);
      } else {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: "bot",
            text: "Can't generate text. Please try again",
            type: "error",
          },
        ]);
      }
    };

    const onmessage = (event: EventSourceMessage) => {
      setMessages((prevState) => [
        ...prevState.slice(0, -1),
        {
          ...prevState[prevState.length - 1],
          text: prevState[prevState.length - 1].text + event.data,
        },
      ]);
    };

    const onerror = (err: any) => {
      if (messages[messages.length - 1]?.type === "text-loading") {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: "bot",
            text: "Error during text generation. Please try again",
            type: "error",
          },
        ]);
      } else {
        setMessages((prevState) => [
          ...prevState,
          {
            author: "bot",
            text: "Error during text generation. Please try again",
            type: "error",
          },
        ]);
      }
      throw new Error();
    };

    const onclose = () => {
      setInputEnabled(true);
    };

    if (
      messages[messages.length - 1]?.author === "bot" &&
      messages[messages.length - 1]?.type === "text-loading"
    ) {
      fetchTextMessage(
        messages[messages.length - 2].text,
        onopen,
        onmessage,
        onerror,
        onclose,
      ).catch(() => setInputEnabled(true));
    }
  }, [messages]);

  return (
    <Box sx={{ height: "100%", overflowY: "auto", position: "relative" }}>
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
