import { Avatar, Box, Paper, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Face3Icon from '@mui/icons-material/Face3';

const Header = () => {
  const getDate = new Date();
  const today = getDate.getFullYear() + '-' + getDate.getMonth() + '-' + getDate.getDate();
  console.log(today, 'today');

  return (
    <Stack direction='row' spacing={2} sx={{ mb: '20px' }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          flex: 2,
          padding: 1,
          border: 'none',
        }}
      >
        <Avatar sx={{ width: 60, minHeight: 60, bgcolor: '#acffaa' }}>
          <ThumbUpAltOutlinedIcon sx={{ fontSize: '35px', color: '#028200' }} />
        </Avatar>
        <Box sx={{ ml: '10px' }}>
          <Typography sx={{ fontSize: '24px', lineHeight: 1 }}>Hi, 홍길동</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: '#028200', fontSize: '18px', lineHeight: 1 }}>
              Great job
            </Typography>
            <Typography sx={{ color: '#555555', fontSize: '18px', lineHeight: 1 }}>
              &nbsp; 저축을 잘 하고 있군요!
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1.5,
          padding: 1,
        }}
      >
        <Box sx={{ fontSize: '24px', mr: '10px' }}>{today}</Box>
        <Avatar sx={{ width: 60, minHeight: 60, bgcolor: '#aab3ff' }}>
          <Face3Icon sx={{ fontSize: '30px' }} />
        </Avatar>
      </Paper>
    </Stack>
  );
};

export default Header;
