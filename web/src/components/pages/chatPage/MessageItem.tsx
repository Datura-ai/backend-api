import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Message from "../../../types/Message";
import ImagePreview from "../../common/ImagePreview";
import Markdown from "react-markdown";
import styled from "@emotion/styled";
import bot from "../../../assets/bot.png";
import user from "../../../assets/user.png";

const StyledMarkdown = styled(Markdown)`
  & p {
    margin: 0;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    word-break: break-word;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;

  & .avatar {
    border-radius: 50%;
    width: 24px;
    height: 24px;

    & img {
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: contain;
    }
  }

  & .author {
    text-transform: capitalize;
    font-weight: 600;
  }
`;
interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  let contentElem;
  switch (message.type) {
    case "text":
      contentElem = <StyledMarkdown>{message.text}</StyledMarkdown>;
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
      <Author>
        <div className="avatar">
          <img
            alt={message.author}
            src={message.author.toLowerCase() === "bot" ? bot : user}
          />
        </div>
        <Typography className="author">{message.author}</Typography>
      </Author>
      {contentElem}
    </Box>
  );
};

export default MessageItem;
