import { Box, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import SendButton from "./SendButton";

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
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        padding: "10px",
        position: "absolute",
      }}
    >
      <Select
        onChange={(e) => setMode(e.target.value as "text" | "image")}
        value={mode}
        sx={{
          minWidth: "7vw",
          "& .MuiSelect-select": {
            padding: "14px 16px",
          },
          borderRadius: "16px",
        }}
        size="small"
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
              borderWidth: "1px",
            },
          },

          "& .MuiInputBase-root": {
            borderRadius: "16px",
          },

          marginLeft: "8px",
          input: {
            padding: "14px 16px",
          },
        }}
        InputProps={{
          endAdornment: (
            <SendButton
              disabled={!message || message.length < 1}
              onClick={handleSend}
            />
          ),
        }}
      />
    </Box>
  );
};

export default InputBar;
