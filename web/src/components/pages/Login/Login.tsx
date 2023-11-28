import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
export const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_HOST;

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOverflowHidden, setIsOverflowHidden] = useState(false);

  const handleLogin = async () => {
    
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axios.post(`${BACKEND_BASE_URL}/login`, 
        formData,
        { headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          }
        },
      );

      const token = response.data.access_token;
      localStorage.setItem('access_token', token);
      toast.success('Login Success');
      onLogin();
    } catch (error) {
      // Handle login error
      toast.error('Invalid username or password');
    }
  };

  const toggleOverflow = () => {
    setIsOverflowHidden(!isOverflowHidden);
  };

  document.body.style.overflow = isOverflowHidden ? 'hidden' : 'visible';

  return (
    <div>
      <div className="header">
        <img src="https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Logo_RGB_Blue.png" alt="Logo" className="logo" />
      </div>

      <div className="row m-0">
        <div className="col-md-6 p-0 m-0">
          <div className="d-flex flex-column justify-content-center align-items-center pt-5">
            <ToastContainer />
            <h3 className='mt-5 pt-5'>Sign In</h3>
            <div className="mt-3 w-50">
              <label htmlFor="username" className="login-label small">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-3 w-50">
              <label htmlFor="password" className="login-label small">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-3 text-center">
              <button className="btn btn-secondary form-control" onClick={handleLogin}>
                Sign In
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-0 pt-2 m-0 side_image">
          <img
            src="https://img.freepik.com/premium-vector/chatbot-robot-dialog-help-service-user-avatar-smartphone-screen-bot-with-speech-message_985641-922.jpg"
            alt="Picture"
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
