import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import SideMenuList from '../components/SideMenuList';
import InsightsIcon from '@mui/icons-material/Insights';
import flexCenter from '../assets/flexCenter';

const koFont = {
  fontFamily: "'Do Hyeon', sans-serif",
  fontSize: '40px',
  color: 'white',
};

const drawerWidth = 240;

const SideMenuBar = () => {
  return (
    <Drawer
      sx={{
        ...flexCenter,
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(74, 74, 74)',
          borderRadius: '20px 0 0 20px',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Box sx={{ ...flexCenter({ flexDirection: 'row' }), margin: '30px 0 20px 0' }}>
        <Link to='/' style={{ ...flexCenter({ flexDirection: 'row' }), textDecoration: 'none' }}>
          <InsightsIcon sx={{ fontSize: 40, color: 'rgb(4, 142, 84)' }} />
          <Typography sx={{ ...koFont, fontWeight: 'bold' }}>&nbsp;진&nbsp;</Typography>
          <Typography sx={{ ...koFont }}>가계부</Typography>
        </Link>
      </Box>

      <SideMenuList />
    </Drawer>
  );
};

export default SideMenuBar;
