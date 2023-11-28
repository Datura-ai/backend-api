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
    <div className="bottom-0 left-0 right-0 flex p-2 bg-slate-100">
      <select
        className="min-w-[7vw] text-black"
        onChange={(e) => setMode(e.target.value as "text" | "image")}
        value={mode}
      >
        <option value="text">Text</option>
        <option value="image">Image</option>
      </select>
      <input
        type="text"
        className="w-full focus:outline-none focus:placeholder-gray-400 placeholder-gray-600 pl-4 bg-slate-100 text-lg py-3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={!enabled}
      />
      <button onClick={handleSend} className="text-inherit">
      <img src="/arrow-up-solid.svg" alt="send" className="w-6 h-6 rounded-full mr-2"/>
      </button>
    </div>
  );
};

export default InputBar;
