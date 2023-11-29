import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
        <Button
             onClick={handleClose}
              sx={{
                py: 0.5,
                fontWeight: "bold",
                px: 1,
                color:"white",
                minWidth: "100px",
                textTransform: "none",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
                "&:active": {
                  backgroundColor: "black",
                },
                "&:focus": {
                  backgroundColor: "black",
                },
              }}
            >
              Close
            </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImagePreview;
