export type DisplayImage = {
  image_url: string;
  timestamp: string;
  uuid: string;
};

export type ResizableImages = {
  rows?: number;
  cols?: number;
} & DisplayImage;

export type ImageContextDefaultValue = {
  images: DisplayImage[] | null;

  get: () => void;
};
