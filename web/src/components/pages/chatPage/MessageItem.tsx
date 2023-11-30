import React from "react";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import Message from "../../../types/Message";
import ImagePreview from "../../common/ImagePreview";
import { FaHandsHelping, FaUser } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import MessageItemContainer from "../MessageItemContainer";



export interface MessageItemProps {
  message: Message;
  contentElem?: any
  Icon?: any
  mode?:any

}

const MessageItem: React.FC<MessageItemProps> = ({ message,mode }) => {
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
      {message.author === "User" ? (
        <MessageItemContainer
          Icon={FaUser}
          message={message}
          contentElem={contentElem}
          mode={mode}
        />


      ) : (
        <MessageItemContainer
          Icon={FaHandsHelping}
          message={message}
          contentElem={contentElem}
          mode={mode}

       
        />



      )}

    </Box>
  );
};

export default MessageItem;
