import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import MessagesContainer from "./MessagesContainer";
import { AuthorType, Message, MessageType, Mode } from "../../types/Message";
import InputBar from "./InputBar";
import { fetchTextMessage, generateImage } from "../../services/api";
import { EventSourceMessage } from "@microsoft/fetch-event-source";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<Mode>(Mode.TEXT);
  const [inputEnabled, setInputEnabled] = useState<boolean>(true);

  const handleSendMessage = (newMessage: string) => {
    setMessages((prevState) => [
      ...prevState,
      { author: AuthorType.USER, text: newMessage, type: MessageType.TEXT },
    ]);

    switch (mode) {
      case Mode.TEXT:
        setMessages((prevState) => [
          ...prevState,
          {
            author: AuthorType.BOT,
            text: "",
            type: MessageType.TEXT_LOADING,
          },
        ]);
        break;
      case Mode.IMAGE:
        setMessages((prevState) => [
          ...prevState,
          { author: AuthorType.BOT, text: "", type: MessageType.IMAGE_LOADING },
        ]);
        setInputEnabled(false);
        generateImage(newMessage)
          .then((data) => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              {
                author: AuthorType.BOT,
                text: data.data,
                type: MessageType.IMAGE,
              },
            ]);
          })
          .catch(() => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              {
                author: AuthorType.BOT,
                text: "Can't generate image. Please try again",
                type: MessageType.ERROR,
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
            author: AuthorType.BOT,
            text: "",
            type: MessageType.TEXT,
          },
        ]);
        setInputEnabled(false);
      } else {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: AuthorType.BOT,
            text: "Can't generate text. Please try again",
            type: MessageType.ERROR,
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
            author: AuthorType.BOT,
            text: "Error during text generation. Please try again",
            type: MessageType.ERROR,
          },
        ]);
      } else {
        setMessages((prevState) => [
          ...prevState,
          {
            author: AuthorType.BOT,
            text: "Error during text generation. Please try again",
            type: MessageType.ERROR,
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
        onclose
      ).catch(() => setInputEnabled(true));
    }
  }, [messages]);

  return (
    <Box position="relative" className="chat-window">
      <Container maxWidth={"md"} className="container">
        <MessagesContainer messages={messages} />
        <InputBar
          onSendMessage={handleSendMessage}
          enabled={inputEnabled}
          mode={mode}
          setMode={setMode}
        />
      </Container>
      <div className="background-image"></div>
    </Box>
  );
};

export default ChatWindow;
