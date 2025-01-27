import React, { useState } from 'react';
import Header from '../container/Header';
import ExpensesAnalysis from '../container/analysisDashboard/ExpensesAnalysis';
import SavingsAnalysis from '../container/analysisDashboard/SavingsAnalysis';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { expensesData } from '../data/MockDatas';
import { savingsData } from '../data/MockDatas';

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
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const expensisCategories = [
  '미분류',
  '식비',
  '주거/통신',
  '생활용품',
  '의복/미용',
  '건강/문화',
  '교육/육아',
  '교통/차량',
  '경조사/회비',
  '세금/이자',
  '용돈/기타',
  '카드 대금',
];
const savingsCategories = ['미분류', '주수입', '부수입', '전월이월', '저축/보험'];

const expensisCombinedData = [
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

const savingsCombinedData = [
  ...savingsData.savings.map(d => ({
    ...d,
    category: d.category.split(' > ')[0], // "식비 > 간식" -> "식비"
    group: '수입',
  })),
];

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
          <Tabs value={value} onChange={handleChange} aria-label='analysis-tabs'>
            <Tab label='지출' id='tab-0' />
            <Tab label='수입' id='tab-1' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ExpensesAnalysis data={expensisCombinedData} categories={expensisCategories} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SavingsAnalysis data={savingsCombinedData} categories={savingsCategories} />
        </TabPanel>
      </Box>
    </div>
  );
};

export default AnalysisPage;
