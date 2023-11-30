import React, { useState } from "react";
import { Box, TextField, IconButton, MenuItem, Select, InputAdornment, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { BsUpload } from "react-icons/bs";



interface InputBarProps {
  onSendMessage: (message: string) => void;
  enabled: boolean;
  mode: "image" | "text";
  setMode: (mode: "image" | "text") => void;
  messages:any,
}

const InputBar: React.FC<InputBarProps> = ({
  onSendMessage,
  enabled,
  mode,
  setMode,
  messages
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
        position: "absolute",
        bottom:2,
        paddingLeft: 18,
        background:"#343541",
        width:"100%"
      }}
    >
      <Select
        onChange={(e) => setMode(e.target.value as "text" | "image")}
        value={mode}

        autoFocus={false}
        sx={{
          minWidth: "7vw",
          marginRight: "20px",
          border: "1px solid #acacac",
          color: "#C5C5D2",
          outline: 'none !important',
          '&.select:focus-visible': {
            border: 'orange'

          },
          '&:hover': {
            border: "1px solid #acacac",

          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none"
          },
          '&.Mui-focused': {
            border: "1px solid #acacac",
            outline: "none !important"

          },

          '& .MuiSelect-icon': {
            color: '#fff',
          },

        }}


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
            multiline
            sx={{
              width: "65%",

              m: "auto",
              position: 'relative',
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                background: "#343541",
                border: "1px solid #acacac",
                '& fieldset': {
                  border: "none"
                },
                '&:hover fieldset': {
                  border: "none"
                },
                '&.Mui-focused fieldset': {
                  border: "none"
                },
              },
              '& .MuiInputBase-input': {
                paddingRight: '30px',
                color: "#C5C5D2",
                paddingLeft: "13px",

              },
            }}
            maxRows={4}
            minRows={1}
            InputProps={{

              endAdornment: (
                <InputAdornment position="end" style={{ position: 'absolute', right: 20, bottom: 25 }}>
                  <IconButton
                    onClick={handleSend}
                    style={{
                      position: "relative",
                      bottom: 0,
                      cursor: "not-allowed",
                      borderRadius: "9px",
                      color: !message ? "#787878" : "#fff",
                    }}
                    disabled={!message}
                  >
                    <SendIcon fontSize={"small"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> 
      


    </Box>

  );
};

export default InputBar;

