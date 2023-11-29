import React from "react";
import { Box, Typography } from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";
import { DisplayImage } from "../../types";

export const ImageMetadataPreview: React.FC<DisplayImage> = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          justifyContent: "space-around",
          gridTemplateColumns: "40px 1fr",
        }}
      >
        <Person titleAccess="UUID" />
        <Typography>{props.uuid}</Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          justifyContent: "space-around",
          gridTemplateColumns: "40px 1fr",
        }}
      >
        <AccessTime titleAccess="Timestamp" />
        <Typography>{props.timestamp}</Typography>
      </Box>
    </Box>
  );
};
