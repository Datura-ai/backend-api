import React from "react";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import Message from "../../../types/Message";
import ImagePreview from "../../common/ImagePreview";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  let contentElem;
  switch (message.type) {
    case "text":
      if (message.text === "") {
        contentElem = (
          <div style={{ display: "flex", alignItems: "center"}}>
            <Skeleton variant="circular" width={10} height={10} sx={{ transform: "none", marginLeft: "50px" }} />
            <Skeleton variant="circular" width={10} height={10} sx={{ transform: "none", marginLeft: "5px", animationDelay: 0.2 }} />
            <Skeleton variant="circular" width={10} height={10} sx={{ transform: "none", marginLeft: "5px", animationDelay: 0.4 }} />
          </div>
        )
        break;
      }
      contentElem = (
        <Typography sx={{ wordBreak: "break-word", marginLeft: "50px" }}>{message.text}</Typography>
      );
      break;
    case "image":
      contentElem = <ImagePreview imageUrl={message.text} style={{marginLeft: "50px"}} />;
      break;
    case "image-loading":
      contentElem = (
        <Skeleton width={"50%"} height={"40vh"} sx={{ transform: "none", textImarginLeftndent: "50px", marginLeft: "50px" }} />
      );
      break;
    case "text-loading":
      contentElem = (
        <div style={{ display: "flex", alignItems: "center"}}>
          <Skeleton variant="circular" width={10} height={10} sx={{ transform: "none", marginLeft: "50px" }} />
            <Skeleton variant="circular" width={10} height={10} sx={{ transform: "none", marginLeft: "5px", animationDelay: 0.2 }} />
            <Skeleton variant="circular" width={10} height={10} sx={{ transform: "none", marginLeft: "5px", animationDelay: 0.4 }} />
        </div>
      )
      break;
    case "error":
      contentElem = (
        <Typography sx={{ wordBreak: "break-word", marginLeft: "50px" }} color={"error"}>
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
      <div style={{ display: "flex", alignItems: "center"}}>
        <Avatar src={message.author === 'bot' ? "/taotensor.png" : ""} imgProps={{ style: {objectFit: 'contain'}}} sx={{ width: 40, height: 40, marginRight: "8px" }}/>
        <Typography fontWeight={"bold"}>{message.author === 'user' ? 'You' : 'Chatbot' }</Typography>
      </div>
      {contentElem}
    </Box>
  );
};

export default MessageItem;
