import React from "react";
import ChatPage from "./components/pages/chatPage/ChatPage";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
