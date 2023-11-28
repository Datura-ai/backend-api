import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import ChatPage from './components/pages/chatPage/ChatPage';
import NotFound from './components/pages/NotFound';
import AuthRoute from './components/common/AuthRoute';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/chat" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/chat"
          element={loggedIn ? <ChatPage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/chat" />} /> {/* Redirect to /dashboard */}
        <Route path="/protected-page" element={<AuthRoute isAuth={loggedIn} element={<ChatPage onLogout={handleLogout} />} />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
