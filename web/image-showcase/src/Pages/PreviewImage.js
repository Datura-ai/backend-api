import React, {  useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const AlertDialogSlide = ({
  viewerIsOpen,
  closeLightbox,
  currentImage,
  photos,
  downloadImage,
}) => {
  const [loadingCopyLink, setLoadingCopyLink] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const copyLinkToClipboard = async () => {
    try {
      setLoadingCopyLink(true);
      await navigator.clipboard.writeText(`${process.env.REACT_APP_BACKEND_URL}/${currentPhoto.src}`);
      setAlertSeverity("success");
      setAlertMessage("Link copied successfully!");
      setAlertOpen(true);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Error copying link to clipboard.");
      setAlertOpen(true);
    } finally {
      setLoadingCopyLink(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoadingDownload(true);
      await downloadImage(`${process.env.REACT_APP_BACKEND_URL}/${currentPhoto.src}`, `image_${currentImage + 1}`);
    } catch (error) {
      
    } finally {
      setLoadingDownload(false);
    }
  };

  const currentPhoto = photos?.find((item, index) => index === currentImage);

  return (
    <React.Fragment>
      <Dialog
        open={viewerIsOpen}
        onClose={closeLightbox}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        classes={{ paper: "custom-paper-class" }}
        sx={{
          margin: "10px",
          p: 0,
          "& .custom-paper-class": {
            margin: 0,
          },
        }}
      >
        <DialogContent sx={{ px: 0, py: 0 }}>
          <Grid container>
            <Grid item xs={12} md={8.5} sx={{ overflow: "hidden" }}>
              {currentPhoto && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${currentPhoto.src}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={3.5}>
              <Box
                padding={"16px"}
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"column"}
                height={"calc(100% - 32px)"}
              >
                <Accordion variant="" sx={{ padding: 0 }} defaultExpanded>
                  <AccordionSummary
                    sx={{ padding: 0 }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      variant="h6"
                      fontSize={"17px"}
                      fontWeight={"600"}
                    >
                      Meta Data
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <Typography>
                      <b>Filename </b> {currentPhoto.src.split('/')[currentPhoto.src.split('/').length-1]}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Box>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    startIcon={<FileCopyIcon />}
                    onClick={copyLinkToClipboard}
                    loading={loadingCopyLink}
                    sx={{ mt: 2 }}
                  >
                    Copy Link
                  </LoadingButton>

                  <LoadingButton
                    fullWidth
                    variant="contained"
                    endIcon={<CloudDownloadIcon />}
                    onClick={handleDownload}
                    loading={loadingDownload}
                    sx={{ mt: 2 }}
                  >
                    Download
                  </LoadingButton>

                  <Snackbar
                    open={alertOpen}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    autoHideDuration={3000}
                    onClose={handleCloseAlert}
                  >
                    <Alert severity={alertSeverity} onClose={handleCloseAlert}>
                      {alertMessage}
                    </Alert>
                  </Snackbar>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialogSlide;
