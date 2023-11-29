import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./AppRouter";
import { ImageContextProvider } from "./contexts/image.context";
import { ModalContextProvider } from "./contexts/modal.context";
import { Modal } from "./components/common";

function App() {
  return (
    <ModalContextProvider>
      <ImageContextProvider>
        <RouterProvider router={appRouter} />
        <Modal />
      </ImageContextProvider>
    </ModalContextProvider>
  );
}

export default App;
