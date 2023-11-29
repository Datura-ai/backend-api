import { ReactNode } from "react";

export type ModalContextDefaultValue = {
  data: ReactNode | null;
  update: (data: ReactNode | null) => void;
};
