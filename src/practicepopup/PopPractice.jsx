import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const PopPractice = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, setState] = useState(null);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleSelect = status => {
    setState(status);
    setOpenDialog(false);
  };
  return (
    <>
      <Button onClick={handleOpenDialog}>정산 여부 선태</Button>
      <Box>
        <Typography>선택 상태</Typography>
        <Typography>
          {state === true ? '정상완료' : state === false ? '정산미완료' : '미선택'}
        </Typography>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>정산 상태 선택</DialogTitle>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelect(true)}>
              <ListItemText primary='정산완료' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelect(false)}>
              <ListItemText primary='정산미완료' />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default PopPractice;
