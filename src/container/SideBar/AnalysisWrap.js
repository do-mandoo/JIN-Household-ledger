import React, { useState } from 'react';
import Header from '../Header';
import ExpensesAnalysis from '../analysisDashboard/ExpensesAnalysis';
import SavingsAnalysis from '../analysisDashboard/SavingsAnalysis';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { expensesData } from '../../data/MockDatas';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };
const categories = [
  '식비',
  '교통/차량',
  '의복/미용',
  '건강/문화',
  '주거/통신',
  '미분류',
  '생활용품',
  '기타',
];

const combinedData = [
  ...expensesData.meetExpenses.map(d => ({
    ...d,
    category: d.category.split(' > ')[0], // "식비 > 간식" -> "식비"
    group: '공금지출',
  })),
  ...expensesData.individualExpenses.map(d => ({
    ...d,
    category: d.category.split(' > ')[0], // "식비 > 기타" -> "식비"
    group: '개인지출',
  })),
];

const AnalysisWrap = () => {
  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      Analysis분석
      <Box sx={{ minHeight: 760 }}>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label='simple tabs'>
            <Tab label='지출' id='tab-0' />
            <Tab label='수입' id='tab-1' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ExpensesAnalysis data={combinedData} categories={categories} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SavingsAnalysis />
        </TabPanel>
      </Box>
    </div>
  );
};

export default AnalysisWrap;
