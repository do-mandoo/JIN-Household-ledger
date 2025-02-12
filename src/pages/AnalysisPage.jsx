import React, { useState } from 'react';
import Header from '../container/Header';
import ExpensesAnalysis from '../container/analysis/ExpensesAnalysis';
import SavingsAnalysis from '../container/analysis/SavingsAnalysis';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import InvestmentsAnalysis from '../container/analysis/InvestmentsAnalysis';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: '8px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AnalysisPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <Box sx={{ minHeight: 760 }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='analysis-tabs'
            sx={{ bgcolor: '#FFF' }}
          >
            <Tab label='지출' id='tab-0' />
            <Tab label='수입' id='tab-1' />
            <Tab label='투자' id='tab-2' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ExpensesAnalysis />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SavingsAnalysis />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <InvestmentsAnalysis />
        </TabPanel>
      </Box>
    </div>
  );
};

export default AnalysisPage;
