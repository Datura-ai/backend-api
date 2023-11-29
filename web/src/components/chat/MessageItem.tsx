import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { AuthorType, Message } from "../../types/Message";
import ImagePreview from "../common/ImagePreview";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  let contentElem;
  switch (message.type) {
    case "text":
      contentElem = (
        <Typography sx={{ wordBreak: "break-word" }}>{message.text}</Typography>
      );
      break;
    case "image":
      contentElem = <ImagePreview imageUrl={message.text} />;
      break;
    case "image-loading":
      contentElem = (
        <Skeleton width={"50%"} height={"40vh"} sx={{ transform: "none" }} />
      );
      break;
    case "text-loading":
      contentElem = <Skeleton width={"50%"} sx={{ transform: "none" }} />;
      break;
    case "error":
      contentElem = (
        <Typography sx={{ wordBreak: "break-word" }} color={"error"}>
          {message.text}
        </Typography>
      );
  }
  return (
    <Box className={`message-item ${message.author === AuthorType.USER ? "query" : "answer"}`}>
      {contentElem}
    </Box>
  );
};

export default MessageItem;
