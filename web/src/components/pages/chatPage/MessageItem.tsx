import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Message from "../../../types/Message";
import ImagePreview from "../../common/ImagePreview";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  let contentElem;
  switch (message.type) {
    case "text":
      contentElem = (
        <div className="  h-full w-full text-xl"><span className="px-4  text-black">{message.text}</span></div>
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
    <div className={` ${message.author === 'bot' ? 'bg-slate-100' : ''}`}>
      <div className="flex flex-col items-start w-full justify-stretch mb-10 p-2 pb-12">
        <div className="flex items-center my-2">
          <div>
            <img src={message.author === 'bot' ? "/black_t.png" : "/user-solid.svg"} alt="My profile" 
              className="w-6 h-6 rounded-full"/>
            </div>
            <span className="ml-4 font-bold text-2xl">
              {message.author === 'bot' ? 'Bot' : 'User'}
            </span>
          </div>
        <div className="flex ml-6">
          {contentElem}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
