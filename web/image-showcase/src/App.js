import React from "react";
import ShowCasePage from "./Pages/ShowCasePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ShowCasePage />
    </ThemeProvider>
  );
};

export default App;
