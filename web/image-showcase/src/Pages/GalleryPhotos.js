import React, { useEffect, useState } from "react";
import {  Box, LinearProgress } from "@mui/material";
import Gallery from "react-photo-gallery";
import PreviewImage from "./PreviewImage";
import Skeleton from "@mui/material/Skeleton";


const GalleryPhotos = ({sortingOption}) => {
  const [photos, setPhotos] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [loader, setLoader] = useState(true);

  const downloadImage = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/image-showcase/`, {
        });

        if (!response.ok) {
          alert("Failed to fetch photos");
        }
        const data = await response.json();
        const formattedPhotos = data?.map((photo) => ({
          ...photo,
          src: photo.src,
          width: 250,
          height: 250,
          loading: true,
          
        }));
        setPhotos(formattedPhotos);
      } catch (error) {
      } finally {
        setLoader(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleImageLoad = (index) => {
    setPhotos((prevPhotos) =>
      prevPhotos?.map((photo, i) =>
        i === index ? { ...photo, loading: false } : photo
      )
    );
  };

  useEffect(() => {
    const preloadImages = () => {
      photos.forEach((photo) => {
        const img = new Image();
        img.src = photo.src;
      });
    };

    preloadImages();

    const handleResize = () => {
      preloadImages();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [photos]);

  useEffect(() => {
   
    const sortedImages = [...photos].sort((imageOne, imageTwo) => {
      return imageOne[sortingOption.key] - imageTwo[sortingOption.key];
    });
    setPhotos(sortedImages);
  }, [sortingOption]);

  return (
    <>
      {loader ? (
        <Box
          sx={{
            minHeight: "calc(100vh - 251.984px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Gallery
            photos={photos?.map((photo, index) => ({
              ...photo,
              src:`${process.env.REACT_APP_BACKEND_URL}/${photo.src}`,
              onLoad: () => handleImageLoad(index),
            }))}
            onClick={openLightbox}
            renderImage={({ photo, index }) => (
              <Box key={index}>
                {photo.loading && (
                  <Skeleton
                    variant="rectangular"
                    width={photo.width}
                    height={photo.height}
                    animation="wave"
                    sx={{
                      marginBottom: "4px",
                      marginRight: "4px",
                    }}
                  />
                )}
                <img
                  alt={photo.caption || "Author Name"}
                  {...photo}
                  loading="true"
                  style={{
                    display: photo.loading ? "none" : "block",
                    marginBottom: "4px",
                    marginRight: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => openLightbox(index)}
                />
              </Box>
            )}
          />

          <PreviewImage
            setViewerIsOpen={setViewerIsOpen}
            viewerIsOpen={viewerIsOpen}
            closeLightbox={closeLightbox}
            currentImage={currentImage}
            photos={photos}
            downloadImage={downloadImage}
          />
        </>
      )}
    </>
  );
};

export default GalleryPhotos;
