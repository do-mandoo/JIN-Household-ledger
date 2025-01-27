import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Face3Icon from '@mui/icons-material/Face3';

const koFont = {
  fontFamily: "'Jua', sans-serif",
  fontSize: '40px',
};

const Header = () => {
  const getDate = new Date();
  const today = getDate.getFullYear() + '-' + (getDate.getMonth() + 1) + '-' + getDate.getDate();

  return (
    <Stack direction='row' spacing={5} sx={{ mb: '40px' }}>
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
        <Avatar sx={{ width: 60, minHeight: 60 }}>
          <ThumbUpAltOutlinedIcon sx={{ fontSize: '35px' }} />
        </Avatar>
        <Box sx={{ ml: '10px' }}>
          <Typography sx={{ ...koFont, fontSize: '24px', lineHeight: 1 }}>Hi, 홍길동</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ ...koFont, fontSize: '18px', lineHeight: 1 }}>Great job</Typography>
            <Typography sx={{ ...koFont, color: '#555555', fontSize: '18px', lineHeight: 1 }}>
              &nbsp; 저축을 잘 하고 있군요!
            </Typography>
          </Box>
        </Box>
      </Paper>
      {/*  */}
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1.28,
          padding: 1,
        }}
      >
        <Box sx={{ fontSize: '24px', mr: '30px' }}>{today}</Box>
        <Avatar sx={{ width: 60, minHeight: 60, bgcolor: '#aab3ff' }}>
          <Face3Icon sx={{ fontSize: '30px' }} />
        </Avatar>
      </Paper>
    </Stack>
  );
};

export default Header;
