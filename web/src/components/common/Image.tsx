import { Box } from "@mui/material";
import React from "react";
import { CommonImageProps } from "../../types";

export const Image: React.FC<CommonImageProps> = ({ src, ...props }) => {
  return <Box component="img" src={src} {...props} />;
};
