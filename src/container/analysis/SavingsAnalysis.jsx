import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import SavingsCategoryChart from '../../charts/analysis/SavingsCategorychart';

const SavingsAnalysis = () => {
  return (
    <Box>
      <Typography>분류 전체</Typography>
      <SavingsCategoryChart />
    </Box>
  );
};

export default SavingsAnalysis;
