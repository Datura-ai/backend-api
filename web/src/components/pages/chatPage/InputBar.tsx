import React, { useState } from "react";
import { Box, TextField, IconButton, MenuItem, Select } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface InputBarProps {
  onSendMessage: (message: string) => void;
  enabled: boolean;
  mode: "image" | "text";
  setMode: (mode: "image" | "text") => void;
}

const InputBar: React.FC<InputBarProps> = ({
  onSendMessage,
  enabled,
  mode,
  setMode,
}) => {
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
        bottom: 20,
        left: 0,
        right: 0,
        display: "flex",
        padding: "16px 60px",
        position: "absolute",
      }}
    >
      <Select
        onChange={(e) => setMode(e.target.value as "text" | "image")}
        value={mode}
        sx={{ minWidth: "7vw" }}
      >
        <MenuItem value={"text"}>Text</MenuItem>
        <MenuItem value={"image"}>Image</MenuItem>
      </Select>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={!enabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "initial",
            },
          },
          marginLeft: "8px",
        }}
      />
      <IconButton onClick={handleSend} color="inherit">
        <SendIcon fontSize={"large"} />
      </IconButton>
    </Box>
  );
};

export default InputBar;
