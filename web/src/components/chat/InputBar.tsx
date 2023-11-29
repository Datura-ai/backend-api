import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputAdornment,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Mode } from "../../types";

interface InputBarProps {
  onSendMessage: (message: string) => void;
  enabled: boolean;
  mode: Mode;
  setMode: (mode: Mode) => void;
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
    <Box className="input-bar">
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          padding: "0.3rem",
        }}
      >
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={!enabled}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ height: "100%", position: "relative", minWidth: "6em" }}
              >
                <Select
                  className="input-bar-select"
                  onChange={(e) => setMode(e.target.value as Mode)}
                  value={mode}
                >
                  <MenuItem value={Mode.TEXT}>Text</MenuItem>
                  <MenuItem value={Mode.IMAGE}>Image</MenuItem>
                </Select>
                <Divider
                  variant="middle"
                  orientation="vertical"
                  flexItem
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    margin: 0,
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.24)",
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSend}>
                  <SendIcon fontSize={"medium"} sx={{ color: "black" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              paddingRight: "0.5rem",
              "& fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                borderColor: "initial",
              },
            },
            outline: "none",
            borderRadius: "2rem",
            backgroundColor: "white",
          }}
        />
      </Box>
    </Box>
  );
};

export default InputBar;
