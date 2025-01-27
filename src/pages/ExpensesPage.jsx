import React, { useEffect, useState } from 'react';
import Header from '../container/Header';
import { Box } from '@mui/material';
import PublicExpeses from '../container/expenses/PublicExpeses';
import PersonalExpenses from '../container/expenses/PersonalExpenses';

const ExpensesPage = () => {
  return (
    <>
      <Header />
      <Box>
        {/* --공금 지출-- */}
        <PublicExpeses />

        {/* --개인 지출-- */}
        <PersonalExpenses />
      </Box>
    </>
  );
};

export default ExpensesPage;
