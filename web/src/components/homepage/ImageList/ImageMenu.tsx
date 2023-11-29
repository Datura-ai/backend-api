import React, { useContext } from "react";
import { Preview } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ModalContext } from "../../../contexts/modal.context";
import { DisplayImage } from "../../../types";
import { ImageMetadataPreview } from "../../common";

export const ImageMenu: React.FC<DisplayImage> = (props) => {
  const modalContext = useContext(ModalContext);

  return (
    <div className="image-list-element-menu">
      <IconButton
        size="small"
        onClick={() => modalContext.update(<ImageMetadataPreview {...props} />)}
      >
        <Preview />
      </IconButton>
    </div>
  );
};
