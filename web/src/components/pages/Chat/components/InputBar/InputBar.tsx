import React from "react";
import { Box, TextField, IconButton, MenuItem, Select } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useInputBar } from "./useInputBar";

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
  const { handleSend, handleKeyDown, message, setMessage } = useInputBar({
    onSendMessage,
  });

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
          fontFamily: "Fira Code",
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
