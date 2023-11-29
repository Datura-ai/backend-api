import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPage from "../pages/chatPage/ChatPage";
import HomePage from "../pages/homePage/HomePage";

const Router: React.FC = () => (
  <Routes>
    <Route path="/chat" element={<ChatPage />} />
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default Router;