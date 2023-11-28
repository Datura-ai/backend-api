import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img className='mt-5'
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYHqP3nm2BBrOTEF8fcZn2RABPmvuOmwzy6xtro3Hosw&s"
        alt="Error"
        style={{ width: '400px', height: '200px'}}
      />
      <h1 style={{ color: '#555', fontSize: '3rem', margin: '20px 0' }}>Oops! Page Not Found</h1>
      <p style={{ color: '#777', fontSize: '1.2rem', marginBottom: '30px' }}>
        The page you are looking for doesn't exist. It may have been moved or deleted.
      </p>
     
    </div>
  );
};

export default NotFound;
