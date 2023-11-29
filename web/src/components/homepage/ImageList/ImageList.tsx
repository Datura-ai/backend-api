import React, { useContext, useEffect, useMemo } from "react";
import { ImageListItem, ImageList as MUIImageList } from "@mui/material";
import { ImageContext } from "../../../contexts/image.context";

// Components
import { ZoomImage } from "../ImageList/Image";

// Constants
import { ROW_HEIGHT, IMAGE_NET } from "../../../constant";
import { ResizableImages } from "../../../types";

const formatImages = (images: ResizableImages[]) => {
  return images.map((image, index) => {
    return {
      ...image,
      ...IMAGE_NET[index ?? 0],
    };
  });
};

export const ImageList: React.FC = () => {
  const imageContext = useContext(ImageContext);

  const displayImages = useMemo(() => {
    const displayImages = imageContext.images ?? new Array(12).fill({});

    return formatImages(displayImages);
  }, [imageContext.images]);

  useEffect(() => {
    imageContext.get();
  }, []);

  return (
    <MUIImageList variant="quilted" cols={4} rowHeight={ROW_HEIGHT}>
      {displayImages.map((item, index) => (
        <ImageListItem
          className="image-list-element"
          key={index}
          rows={item.rows || 1}
          cols={item.cols || 1}
        >
          <ZoomImage {...item} />
        </ImageListItem>
      ))}
    </MUIImageList>
  );
};
