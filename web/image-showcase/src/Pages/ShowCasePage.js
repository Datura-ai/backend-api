import { useState } from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Container, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import GalleryPhotos from "./GalleryPhotos";

export default function MenuAppBar() {
  const defaultSortingOption = {key: "uID", "name": "UID"};
  const [sortingOption, setSortingOption] = useState(defaultSortingOption);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (sortOption) => {
    setSortingOption(sortOption);
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar sx={{ justifyContent: "center", display: "flex" }}>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <img
            src="./taotensorLogo.png"
            style={{ width: 150 }}
            alt="taotensorLogo"
          />
        </Stack>
      </Toolbar>

      <Container>
        <Toolbar
          sx={{
            height: "64px !important",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "0px !important",
          }}
        >
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-end"}
          >
            <Typography variant="subtitle2" mr={2} mt={"2.531px"}>
              <b> Sort By:</b>
            </Typography>

            <Button
              onClick={handleMenuClick}
              sx={{
                padding: 0,
                textTransform: "none",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
                "&:active": {
                  backgroundColor: "white",
                },
                "&:focus": {
                  backgroundColor: "white",
                },
              }}
            >
              {sortingOption.name}{" "}
              {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick({key: "uID", "name": "UID"})}>
                UID
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick({key: "hotKey", "name": "Hot Key"})}>
                Hot Key
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick({key: "coldKey", "name": "Cold Key"})}>
                Cold Key
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick({key: "ipAddress", "name": "IP Address"})}>
                IP Address
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>

        <Box mt={0.5}>
          <GalleryPhotos
           sortingOption={sortingOption} />
        </Box>
      </Container>
    </Box>
  );
}
