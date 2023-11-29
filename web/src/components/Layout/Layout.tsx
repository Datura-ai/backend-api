import React, { ReactNode } from "react";
import { styled, useTheme, Theme, ThemeProvider } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
} from "@mui/material";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const drawer = (
    <div>
      <div />
      <List>
        
        <ListItem button>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 2" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
       <CssBaseline />
        <Box
          component={"main"}
          sx={{
            width: { md: "calc(100%)", xs: "100%" },
            margin: { md: "0px 0px 0px auto" },
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
