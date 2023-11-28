import ChatPage from './components/pages/chatPage/ChatPage';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ background: '#e6e6e6' }}>
      <Box sx={{
        width: '100%',
        height: 100
      }}>
        <img src='taotensor_logo.svg' alt='Logo' width="auto" height="100%" />
      </Box>
      <ChatPage />
    </Box>
  );
}

export default App;
