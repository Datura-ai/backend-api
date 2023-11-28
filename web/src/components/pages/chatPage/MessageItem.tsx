import React from "react";
import { Box, Skeleton, Typography, Avatar } from "@mui/material";
import Message from "../../../types/Message";
import ImagePreview from "../../common/ImagePreview";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
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
        padding: "10px 8px",
        backgroundColor:  message.author=="user" ? "rgba(0,255, 0,0.1)" : "rgba(239, 239, 240,0.4)",
        borderRadius: "10px",
      }}
    >
      <div style={{display: "flex", alignItems: "center"}}>
        {message.author=="user" ? 
           <Avatar sx={{ bgcolor: "rgba(0,255, 0,0.4)" }}>
            <PermIdentityOutlinedIcon />
          </Avatar> : <Avatar sx={{ bgcolor: "rgba(155, 155, 155,0.8)" }}>
            <SmartToyOutlinedIcon />
          </Avatar> 
        }
      <Typography fontWeight={"bold"}  sx={{ color: message.author=="user" ? "green" : "grey", marginLeft: "5px" }}>{message.author.charAt(0).toUpperCase() + message.author.slice(1)}</Typography>
      </div>
      {contentElem}
    </Box>
  );
};

export default MessageItem;
