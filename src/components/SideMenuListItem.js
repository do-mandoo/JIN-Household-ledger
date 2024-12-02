import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

const SideMenuListItem = ({ list }) => {
  const { firstText, secondText, link, icon } = list;
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ padding: '10px 0 10px 40px' }} component={Link} to={link}>
        <ListItemIcon sx={{ minWidth: '40px' }}>{icon}</ListItemIcon>
        <ListItemText
          sx={{ color: 'white' }}
          primary={
            <Typography variant='h6' sx={{ fontFamily: "'Do Hyeon', sans-serif" }}>
              {firstText}
            </Typography>
          }
          secondary={<Typography variant='p'>{secondText}</Typography>}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SideMenuListItem;
