import React from "react";

// Components
import { List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

export const Menu: React.FC = () => {
  return (
    <List className="common-menu-list">
      <ListItem className="common-menu-list-item">
        <Link to="/">Home</Link>
      </ListItem>
      <ListItem className="common-menu-list-item">
        <Link to="/chat">Chat</Link>
      </ListItem>
    </List>
  );
};
