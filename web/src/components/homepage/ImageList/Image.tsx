import React, { useEffect, useRef, useState } from "react";

// Components
import { ImageMenu } from "./ImageMenu";
import Zoom from "react-medium-image-zoom";

// Types
import { ResizableImages } from "../../../types";

// Styles
import "react-medium-image-zoom/dist/styles.css";

// Constants
import { ROW_HEIGHT } from "../../../constant";
import { Skeleton } from "@mui/material";
import { srcset } from "../../../helpers";

export const ZoomImage: React.FC<ResizableImages> = (props) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }

    const { src, srcSet } = srcset(
      props.image_url,
      ROW_HEIGHT,
      props.rows,
      props.cols
    );

    imageRef.current.onload = () => {
      setLoading(false);
    };
    imageRef.current.src = src;
    imageRef.current.srcset = srcSet;
  }, [props]);

  return (
    <span>
      <Zoom zoomImg={{ src: props.image_url }}>
        {loading && (
          <Skeleton
            animation="wave"
            sx={{ transform: "none", width: "100%", height: "100%" }}
          />
        )}
        <img
          ref={imageRef}
          {...srcset(props.image_url, ROW_HEIGHT, props.rows, props.cols)}
          alt=""
          loading="lazy"
          className="MuiImageListItem-img"
        />
      </Zoom>
      {!loading && <ImageMenu {...props} />}
    </span>
  );
};
