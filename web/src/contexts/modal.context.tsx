import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useState,
} from "react";

// Types
import { ModalContextDefaultValue } from "../types";

export const ModalContext = createContext<ModalContextDefaultValue>({
  data: null,
  update: () => {},
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<ReactNode | null>(null);

  const update = (newData: ReactNode) => {
    setData(newData);
  };

  return (
    <ModalContext.Provider value={{ data, update }}>
      {children}
    </ModalContext.Provider>
  );
};
