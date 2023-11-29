import React, { useRef, useEffect, useState } from "react";
import Message from "../../../types/Message";
import MessageItem from "./MessageItem";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  capitalize,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface MessagesContainerProps {
  messages: Message[];
  mode: "image" | "text";
  setMode: (mode: "image" | "text") => void;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  messages,
  mode,
  setMode,
}) => {
  const defaultSortingOption = "text";
  const [sortingOption, setSortingOption] = useState(defaultSortingOption);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (mode: string | null) => {
    if (mode) {
      setSortingOption(mode);
      setMode(mode as "text" | "image");
      handleClose();
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showIcon, setShowIcon] = useState(false);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (messagesEndRef.current) {
      const isScrolledToBottom =
        messagesEndRef.current.scrollHeight -
          messagesEndRef.current.scrollTop ===
        messagesEndRef.current.clientHeight;

      setShowIcon(!isScrolledToBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      ref={messagesEndRef}
      className="scrollBar"
      position={"relative"}
      sx={{
        height: "calc(100% - 72px)",
        overflowY: "auto",
      }}
      onScroll={handleScroll}
    >
      <Box>
        <Box>
          <Stack
            sx={{
              bgcolor: "hsla(0,0%,100%,.95)",
              px: "1rem",
              py: "1rem",
              zIndex: 999,
              mb: "0.375rem",
              position: "sticky",
              top: 0,
              border: "0 solid #d9d9e3",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight={"bold"}>
              TaoTensor
            </Typography>

            <Button
              onClick={(event) => handleMenuClick(event)}
              sx={{
                py: 0.5,
                fontWeight: "bold",
                px: 1,
                minWidth: "100px",
                border: "1px solid lightgray",
                textTransform: "none",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
                "&:active": {
                  backgroundColor: "white",
                },
                "&:focus": {
                  backgroundColor: "white",
                },
              }}
            >
              {capitalize(sortingOption)}{" "}
              {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            <Menu
              id="menu-appbar"
              PaperProps={{
                style: {
                  minWidth: "100px"
                }
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                data-value="text"
                onClick={(e) =>
                  handleMenuItemClick(
                    e.currentTarget.getAttribute("data-value")
                  )
                }
              >
                Text
              </MenuItem>
              <MenuItem
                data-value="image"
                onClick={(e) =>
                  handleMenuItemClick(
                    e.currentTarget.getAttribute("data-value")
                  )
                }
              >
                Image
              </MenuItem>
            </Menu>
          </Stack>

          {messages?.length > 0 ? (
            <Box
              sx={{
                padding: "16px",
                height: "calc(100% - 71.5px)",
              }}
            >
              {messages.map((message, index) => (
                <MessageItem key={index} message={message} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <img src={"./taotensorLogo.png"} alt="logo" width={150} />
              <Typography variant="h5" fontWeight={"550"}>
                How can I assist you today?
              </Typography>
            </Box>
          )}
        </Box>

        {showIcon && (
          <IconButton
            onClick={scrollToBottom}
            sx={{
              position: "fixed",
              bottom: 90,
              left: "50%",
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              },
              "& .MuiSvgIcon-root": {
                fontWeight: "bold",
              },
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default MessagesContainer;
