import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
// import ExpensisCategorychart from '../../charts/ExpensisCategorychart';
// import ExpensisDatechart from '../../charts/ExpensisDatechart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const ExpensesAnalysis = ({ data, categories }) => {
  return (
    <Box sx={{}}>
      {/* 분류별지출 */}
      <Box sx={{ width: '1400px', m: '5px auto' }}>
        <Typography sx={{ fontSize: '20px' }}>분류 전체</Typography>
        {/* <ExpensisCategorychart data={data} categories={categories} /> */}
      </Box>

      <Divider sx={{ bgcolor: 'black' }} />
      {/* 날짜별지출 */}
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
                p: '5px 10px',
                cursor: 'pointer',
              }}
            >
              <DonutLargeIcon />
              <Box sx={{ display: 'flex', flexFlow: 'column', pl: '10px' }}>
                <Typography sx={{ fontSize: '16px' }}>{d}</Typography>
                <Typography sx={{ fontSize: '14px' }}>200,000</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        {/* <ExpensisDatechart data={data} categories={categories} /> */}
      </Box>
    </Box>
  );
};

export default ExpensesAnalysis;
