import React from 'react';
import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import Message from '../../../types/Message';
import ImagePreview from '../../common/ImagePreview';

interface MessageItemProps {
  message: Message;
  isUserMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isUserMessage,
}) => {
  let contentElem;
  switch (message.type) {
    case 'text':
      contentElem = (
        <Typography
          sx={{
            wordBreak: 'break-word',
            textAlign: isUserMessage ? 'right' : 'left',
          }}
        >
          {message.text}
        </Typography>
      );
      break;
    case 'image':
      contentElem = <ImagePreview imageUrl={message.text} />;
      break;
    case 'image-loading':
      contentElem = (
        <Skeleton width={'50%'} height={'40vh'} sx={{ transform: 'none' }} />
      );
      break;
    case 'text-loading':
      contentElem = <Skeleton width={'50%'} sx={{ transform: 'none' }} />;
      break;
    case 'error':
      contentElem = (
        <Typography
          sx={{
            wordBreak: 'break-word',
            textAlign: isUserMessage ? 'right' : 'left',
          }}
          color={'error'}
        >
          {message.text}
        </Typography>
      );
  }

  return (
    <Box
      sx={{
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column', // Reverse order for user messages
        alignItems: isUserMessage ? 'end' : 'start',
      }}
    >
      <Box
        sx={{
          marginBottom: '16px',
          display: 'flex',
          flexDirection: isUserMessage ? 'row-reverse' : 'row', // Reverse order for user messages
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ marginRight: '8px' }}>{message.author.charAt(0)}</Avatar>
        <Typography marginRight={1} fontWeight={'bold'}>
          {message.author}
        </Typography>
      </Box>
      <Box
        sx={{
          background: 'white',
          padding: 3,
          borderRadius: 3,
          maxWidth: '50%',
          marginLeft: isUserMessage ? 'auto' : '50px',
          marginRight: isUserMessage ? '50px' : 'auto',
        }}
      >
        {contentElem}
      </Box>
    </Box>
  );
};

export default MessageItem;
