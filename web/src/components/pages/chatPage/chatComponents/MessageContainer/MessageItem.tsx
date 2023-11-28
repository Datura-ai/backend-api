import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Message from "../../../../../types/Message";
import ImagePreview from "../../../../common/ImagePreview";
import AvatarGenerator from "../../../../common/Avatar/AvatarGenerator";

import styles from "./messageStyles.module.css";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  let contentElem;
  switch (message.type) {
    case "text":
      contentElem = <>{message.text}</>;
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
      <div className={styles.message}>
        <div className={styles.avatar}>
          <AvatarGenerator name={message.author} size={30} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className={styles.name}>{message.author}</span>
          <span className={styles.text}>{contentElem}</span>
        </div>
      </div>
    </Box>
  );
};

export default MessageItem;
