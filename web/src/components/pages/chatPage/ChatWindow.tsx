import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MessagesContainer from "./MessagesContainer";
import Message from "../../../types/Message";
import TextMessage from "../../../types/TextMessage";

import InputBar from "./InputBar";
import { fetchTextMessage, generateImage } from "../../../services/api";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { type } from "os";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  const [textMessages, setTextMessages] = useState<Array<TextMessage>>([]);

  const [mode, setMode] = useState<"image" | "text">("text");
  const [inputEnabled, setInputEnabled] = useState<boolean>(true);

  const handleSendMessage = (newMessage: string) => {
    setMessages((prevState) => [
      ...prevState,
      { author: "user", text: newMessage, type: "text" },
    ]);

    if (mode === "text") {
      setTextMessages((prevState) => [
        ...prevState,
        { role: "user", content: newMessage },
      ]);
    }

    switch (mode) {
      case "text":
        setMessages((prevState) => [
          ...prevState,
          {
            author: "ChatBot",
            text: "",
            type: "text-loading",
          },
        ]);

        break;
      case "image":
        setMessages((prevState) => [
          ...prevState,
          { author: "ChatBot", text: "", type: "image-loading" },
        ]);
        setInputEnabled(false);
        generateImage(newMessage)
          .then((data) => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              { author: "ChatBot", text: data.data, type: "image" },
            ]);
          })
          .catch(() => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              {
                author: "ChatBot",
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
            author: "ChatBot",
            text: "",
            type: "text",
          },
        ]);

        setTextMessages((prevState) => [
          ...prevState,
          {
            role: "system",
            content: "",
          },
        ]);

        setInputEnabled(false);
      } else {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: "ChatBot",
            text: "Can't generate text. Please try again",
            type: "error",
          },
        ]);

        setTextMessages((prevState) => [
          ...prevState,
          {
            role: "system",
            content: "Can't generate text. Please try again",
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
            author: "ChatBot",
            text: "Error during text generation. Please try again",
            type: "error",
          },
        ]);
      } else {
        setMessages((prevState) => [
          ...prevState,
          {
            author: "ChatBot",
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
      messages[messages.length - 1]?.author === "ChatBot" &&
      messages[messages.length - 1]?.type === "text-loading"
    ) {
      fetchTextMessage(textMessages, onopen, onmessage, onerror, onclose).catch(
        () => setInputEnabled(true)
      );
    }
  }, [messages]);

  return (
    <Box
      position={"relative"}
      sx={{
        maxHeight: {
          xs: "100vh",
     
        },
        minHeight: {
          xs: "100vh",
        },
        height: "100%",
      }}
    >
      <MessagesContainer messages={messages} mode={mode} setMode={setMode} />

      <InputBar onSendMessage={handleSendMessage} enabled={inputEnabled} />
    </Box>
  );
};

export default ChatWindow;
