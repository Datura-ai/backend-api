import {Image} from "./imagesTypes";

type RootState = {
  images: {
    items: Image[];
    loading: boolean;
    error: Error | null;
  };
};

export default RootState;
