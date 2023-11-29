import React from "react";

//Images
import Logo from "../../images/logo.svg";

// Components
import { AppBar } from "@mui/material";
import { Image } from "./Image";
import { Menu } from "./Menu";

export const Header: React.FC = () => {
  return (
    <AppBar position="sticky" className="common-header">
      <Image src={Logo} />
      <Menu />
    </AppBar>
  );
};
