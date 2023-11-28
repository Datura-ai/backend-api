import React from "react";
import ChatWindow from "./ChatWindow";
import '../Login/Login.css';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface LogoutProps {
  onLogout: () => void;
}

const ChatPage: React.FC<LogoutProps> = ({onLogout}) => {
  const handleLogout = ()=> {
    onLogout();
  };
  return (
    <>
      <div className="header">
        <img src="https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Logo_RGB_Blue.png" alt="Logo" className="logo" />
        <IconButton aria-label="delete" size="small">
          <LogoutIcon fontSize="inherit" onClick={handleLogout} sx={{marginRight: "10px"}}/>
        </IconButton>
      </div>
      <ChatWindow />
    </>
  );
};

export default ChatPage;
