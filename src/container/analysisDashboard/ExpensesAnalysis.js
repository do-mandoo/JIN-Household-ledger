import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Barchart from '../../components/Barchart';
import Datechart from '../../components/Datechart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const ExpensesAnalysis = ({ data, categories }) => {
  console.log(data.map(d => console.log(d.amount, 'data를 보자~~')));

  return (
    <Box sx={{}}>
      <Box sx={{ width: '1400px', m: '5px auto' }}>
        <Typography sx={{ fontSize: '20px' }}>분류 전체</Typography>
        <Barchart data={data} />
      </Box>
      <Divider sx={{ bgcolor: 'black' }} />
      <Box sx={{ width: '1400px', m: '10px auto 0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: '10px',
          }}
        >
          <Typography variant='h6' textAlign='left'>
            날짜별 지출
          </Typography>
          <Typography sx={{ mr: '5px', cursor: 'pointer', border: '1px solid black' }}>
            전체 날짜 보기
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {categories.map(d => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #aaa',
                borderRadius: '20px',
                p: '13px 20px',
                cursor: 'pointer',
              }}
            >
              <DonutLargeIcon fontSize='large' />
              <Box sx={{ display: 'flex', flexFlow: 'column', pl: '10px' }}>
                <Typography>{d}</Typography>
                <Typography>200,000</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Datechart data={data} categories={categories} />
      </Box>
    </Box>
  );
};

export default ExpensesAnalysis;
