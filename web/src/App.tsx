import React from "react";

import "./App.css";

import Layout from "./components/Layout";
import ChatPage from "./components/pages/Chat";

function App() {
  return (
    <Layout>
      <ChatPage />
    </Layout>
  );
}

export default App;
