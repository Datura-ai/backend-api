import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from "./components/pages/chatPage/ChatPage";
import { v4 as uuidv4 } from 'uuid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:uuid" element={<ChatPage />} />
        <Route path="/" element={<Navigate replace to={`/${uuidv4()}`} />} />
      </Routes>
    </Router>
  );
}

export default App;
