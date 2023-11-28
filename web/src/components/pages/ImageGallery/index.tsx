import React, { useState, useEffect, useCallback } from "react";
import { getShowcaseImages } from "../../../services/api";
import { Box, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, ImageList, ImageListItem, Menu, MenuItem, Radio, RadioGroup, Typography } from "@mui/material";
import { CloseOutlined, MoreVertOutlined } from "@mui/icons-material";
import Moment from 'react-moment';
import LayoutComponent from "../../common/Layout";

const ImagePage: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewImage, setViewImage] = useState<string>('');
  const [openMetaModal, setOpenMetaModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState<string>('recent');

  useEffect(() => {
    setIsLoading(true);
    getShowcaseImages(sortBy)
      .then((data) => {
        setImages(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('error')
      })
  }, [sortBy]);

  const handleViewImage = (image: string) => {
    setViewImage(image);
  }

  const handleCloseViewImage = () => {
    setViewImage('');
  }

  const handleCloseMetaModal = () => {
    setOpenMetaModal(false);
  }

  const handleOpenMetaModal = () => {
    setOpenMetaModal(true);
  }

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(viewImage);
    handleMenuClose();
  };

  const handleMetadata = () => {
    handleMenuClose();
    handleOpenMetaModal();
  };

  const handleDownload = useCallback(
    (e: any) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      if (!viewImage.length) {
        console.log('Please add an image url');
        return;
      }

      const fetchUrl = viewImage;

      fetch(fetchUrl, {
        method: 'GET',
        headers: {}
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute(
              'download',
              imageData?.name ?? 'download.jpg',
            );
            document.body.appendChild(link);
            link.click();
          });
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    [viewImage, images]
  );

  const imageData = images.filter(i => i.url === viewImage)?.[0];

  return (
    <LayoutComponent>
      <Box maxWidth={1024} marginX='auto' marginY={2}>
        <Box padding={4}>
          <Typography variant="h3" align="center" marginBottom='36px' gutterBottom>
            Image Gallery
          </Typography>
          <Box display='flex' justifyContent='end' marginBottom='12px'>
            <FormControl>
              <FormLabel id="demo-form-control-label-placement">Sort By</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="top"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <FormControlLabel value="recent" control={<Radio />} label="Recent" />
                <FormControlLabel value="uid" control={<Radio />} label="UID" />
                <FormControlLabel value="hotkey" control={<Radio />} label="Hotkey" />
              </RadioGroup>
            </FormControl>
          </Box>
          {!isLoading && images.length === 0 && (
            <Typography variant="h4" align="center" gutterBottom>
              No images found
            </Typography>
          )}
          {isLoading ? (
            <Box minHeight='120px' display='flex' alignItems='center' justifyContent='center'>
              <CircularProgress />
            </Box>
          ) : (
            <ImageList variant="masonry" cols={3} gap={8}>
              {images.map((image: any) => (
                <ImageListItem key={image.id} onClick={() => handleViewImage(image.url)} style={{ cursor: 'pointer' }}>
                  <img
                    srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${image.url}?w=248&fit=crop&auto=format`}
                    alt={image.id}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <Dialog open={Boolean(viewImage)} onClose={handleCloseViewImage} fullWidth maxWidth={false} fullScreen PaperProps={{
            style: {
              background: '#111111EE'
            }
          }}>
            <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'absolute', right: '16px', top: '16px' }}>
              <IconButton aria-label="settings" aria-controls="menu" aria-haspopup="true" onClick={handleMenuClick}>
                <MoreVertOutlined style={{ color: 'white' }} />
              </IconButton>
              <Menu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleCopy}>Copy Image URL</MenuItem>
                <MenuItem onClick={handleDownload}>
                  Download Image
                </MenuItem>
                <MenuItem onClick={handleMetadata}>View Metadata</MenuItem>
              </Menu>
              <IconButton color="inherit" onClick={handleCloseViewImage} aria-label="close">
                <CloseOutlined sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' margin='auto'>
              <img src={viewImage} alt="Image in full quality" style={{ maxWidth: '90%', maxHeight: '90vh', height: 'auto' }} />
            </Box>
          </Dialog>
          <Dialog open={openMetaModal} onClose={handleCloseMetaModal}>
            <DialogTitle>{"Image Metadata"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                UID: {imageData?.id} <br />
                Creation Time: <Moment format="MM/DD/YYYY hh:mm:ss A">{imageData?.updatedAt}</Moment> <br />
                MIME Type: {imageData?.mimetype}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </LayoutComponent>
  );
};

export default ImagePage;
