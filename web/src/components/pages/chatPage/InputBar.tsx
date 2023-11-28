import React, { useState } from 'react';
import { Box, TextField, IconButton/* , MenuItem, Select  */} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachIcon from '@mui/icons-material/AttachFile';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  enabled: boolean;
  mode: 'image' | 'text';
  setMode: (mode: 'image' | 'text') => void;
}

const InputBar: React.FC<InputBarProps> = ({
  onSendMessage,
  enabled,
  // mode,
  // setMode,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        padding: '10px',
        position: 'absolute',
      }}
    >
      {/* <Select
        onChange={(e) => setMode(e.target.value as 'text' | 'image')}
        value={mode}
        sx={{ minWidth: '7vw' }}
      >
        <MenuItem value={'text'}>Text</MenuItem>
        <MenuItem value={'image'}>Image</MenuItem>
      </Select> */}
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Type a message...'
        disabled={!enabled}
        sx={{
          'backgroundColor': 'white', // Set background color to white
          'borderRadius': 30, // Set border radius to 30
          'border': 'none', // Remove border
          '& .MuiOutlinedInput-root': {
            'borderRadius': 30, // Set border radius to 30 for the input
            '&.Mui-focused fieldset': {
              borderColor: 'initial',
            },
          },
          'display': 'flex',
          'alignItems': 'center',
          'paddingLeft': '8px', // Adjust left padding
          'paddingRight': '8px', // Adjust right padding
          '& fieldset': { border: 'none' },
        }}
        InputProps={{
          endAdornment: (
            <React.Fragment>
              <IconButton
                edge='end'
                color='inherit'
                // onClick={handleAttachClick} // Replace with your attach action
              >
                <AttachIcon />
              </IconButton>
              <IconButton
                edge='end'
                color='inherit'
                onClick={handleSend} // Replace with your send action
              >
                <SendIcon />
              </IconButton>
            </React.Fragment>
          ),
          sx: {
            marginRight: '8px', // Adjust right margin
          },
        }}
      />
    </Box>
  );
};

export default InputBar;
