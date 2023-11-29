import React, { useContext, useMemo } from "react";
import { ModalContext } from "../../contexts/modal.context";

// Icons
import { Close as CloseIcon } from "@mui/icons-material";

// Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

export const Modal: React.FC = () => {
  const modalContext = useContext(ModalContext);

  const open = useMemo(() => {
    return !!modalContext.data;
  }, [modalContext.data]);

  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => {
            modalContext.update(null);
          }}
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
      <DialogContent>{modalContext.data}</DialogContent>
      <DialogActions>
        <Button onClick={() => modalContext.update(null)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
