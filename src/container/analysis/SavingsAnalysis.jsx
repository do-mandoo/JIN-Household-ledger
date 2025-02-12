import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import SavingsChart from '../../charts/analysis/SavingsChart';

const SavingsAnalysis = () => {
  return (
    <Box>
      수입
      <SavingsChart />
    </Box>
  );
};

export default SavingsAnalysis;
