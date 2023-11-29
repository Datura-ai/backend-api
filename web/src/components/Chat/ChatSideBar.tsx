import React, { useState } from 'react';
import { FiPlus, FiArrowRight, FiDownload, FiUpload, FiSettings } from 'react-icons/fi';

const ChatSideBar: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`flex flex-col h-full w-64 bg-gray-200 ${isSidebarCollapsed ? 'hidden' : ''}`}>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">New Chat</h2>
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={handleToggleSidebar}
        >
          <FiArrowRight size={20} />
        </button>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col justify-end flex-grow">
        <button className="flex gap-2 items-center justify-start p-4 hover:bg-gray-300 focus:outline-none">
          <FiDownload size={20} />
          Import Data
        </button>
        <button className="flex gap-2 items-center justify-start p-4 hover:bg-gray-300 focus:outline-none">
          <FiUpload size={20} />
          Export Data
        </button>
        <button className="flex gap-2 items-center justify-start p-4 hover:bg-gray-300 focus:outline-none">
          <FiSettings size={20} />
          Settings
        </button>
      </div>
    </div>
  );
};

export default ChatSideBar;
