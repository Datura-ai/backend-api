import React from 'react';
import { Link } from 'react-router-dom';

const Navigator: React.FC = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
    </ul>
  </nav>
);

export default Navigator;