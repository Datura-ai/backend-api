import React, { CSSProperties, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface ImagePreviewProps {
  imageUrl: string;
  style?: CSSProperties | undefined;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, style }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={style}>
      <img
        src={imageUrl}
        alt="Preview"
        onClick={handleOpen}
        style={{
          cursor: "pointer",
          maxHeight: "40vh",
          objectFit: "scale-down",
        }}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 16,
              top: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img
              src={imageUrl}
              alt="Full Size"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImagePreview;
