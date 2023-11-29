import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Message from "src/types/Message";
import ImagePreview from "src/components/common/ImagePreview";

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
    <Box
      sx={{
        marginBottom: "16px",
      }}
    >
      <Typography fontWeight={"bold"}>{message.author}</Typography>
      {contentElem}
    </Box>
  );
};

export default MessageItem;
