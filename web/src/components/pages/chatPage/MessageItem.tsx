import React from "react";
import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import Message from "../../../types/Message";
import ImagePreview from "../../common/ImagePreview";
import { capitalize } from "../../../utils/capitalize";

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
        <Skeleton width={"40vw"} height={"40vh"} sx={{ transform: "none" }} />
      );
      break;
    case "text-loading":
      contentElem = <Skeleton width={"40vw"} sx={{ transform: "none" }} />;
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
        py: { xs: "0.5rem", sm: "1.5rem" },
        px: "1rem",
        maxWidth: { lg: "48rem" },
        mx: { lg: "auto" },
      }}
    >
      <Stack flexDirection="row" gap="0.785rem">
        <Avatar src={message.author === "ChatBot" ? "./download.png" : ""} />
        <Stack flexDirection="column">
          <Typography fontWeight={"bold"}>
            {capitalize(message.author)}
          </Typography>
          {contentElem}
        </Stack>
      </Stack>
    </Box>
  );
};

export default MessageItem;
