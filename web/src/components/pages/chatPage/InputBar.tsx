import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import InputBarProps from "../../../types/InputBarProps";
import SendIcon from "@mui/icons-material/Send";

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, enabled }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        pb: "16px",
        px: "16px",
        position: "absolute",
        maxWidth: { lg: "50rem" },
        zIndex: 999,
        mx: { lg: "auto" },
      }}
    >
     

      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message ChatBot..."
        disabled={!enabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "18px",
            "&.Mui-focused fieldset": {
              borderColor: "initial",
            },
          },
          
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSend} color="inherit">
                <SendIcon fontSize="medium" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default InputBar;
