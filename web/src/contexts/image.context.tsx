import React, { PropsWithChildren, createContext, useState } from "react";

// Types
import { DisplayImage, ImageContextDefaultValue } from "../types";
import { getImages } from "../services/api";

export const ImageContext = createContext<ImageContextDefaultValue>({
  images: null,

  get: () => {},
});

export const ImageContextProvider = ({ children }: PropsWithChildren) => {
  const [images, setImages] = useState<DisplayImage[] | null>(null);

  const get = () =>
    getImages()
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

  return (
    <ImageContext.Provider value={{ images, get }}>
      {children}
    </ImageContext.Provider>
  );
};
