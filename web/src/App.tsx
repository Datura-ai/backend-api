import React from "react";
import ChatPage from "./components/pages/chatPage/ChatPage";
import ImagePage from "./components/pages/ImageGallery";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImagePage />,
  },
  {
    path: "chatbot",
    element: <ChatPage />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
