import React from 'react';
import { Link } from 'react-router-dom';
import './Navigator.css'

const Navigator: React.FC = () => (
  <nav>
    <ul>
      <li className='navbar-element'>
        <Link to="/">Home</Link>
      </li>
      <li className='navbar-element'>
        <Link to="/chat">Chat</Link>
      </li>
    </ul>
  </nav>
);

export default Navigator;