import React from "react";

import "./App.css";

import Layout from "./components/common/Layout";
import ChatPage from "./components/pages/ChatPage";

function App() {
  return (
    <Layout>
      <ChatPage />
    </Layout>
  );
}

export default App;
