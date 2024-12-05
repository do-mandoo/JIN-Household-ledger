import React, { useState } from 'react';
import Header from '../Header';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const createData = (date, details, amount, category, etc) => {
  return { date, details, amount, category, etc };
};

const rowData = [
  createData('10.08', '월급', '2,000,000', '월급>월급', ''),
  createData('10.10', '옆돌기 재롱부리기', '2,000', '부수입>기타', '다음엔 앞구르기를..'),
  createData('10.15', '설거지', '500', '부수입>기타', ''),
  createData('10.15', '심부름', '1000', '부수입>기타', ''),
  createData('10.15', '용돈', '10,000', '부수입>기타', '까까비'),
  createData('10.08', '월급', '2,000,000', '월급>월급', ''),
  createData('10.10', '옆돌기 재롱부리기', '2,000', '부수입>기타', '다음엔 앞구르기를..'),
  createData('10.15', '설거지', '500', '부수입>기타', ''),
  createData('10.15', '심부름', '1000', '부수입>기타', ''),
  createData('10.15', '용돈', '10,000', '부수입>기타', '까까비'),
  createData('10.08', '월급', '2,000,000', '월급>월급', ''),
  createData('10.10', '옆돌기 재롱부리기', '2,000', '부수입>기타', '다음엔 앞구르기를..'),
  createData('10.15', '설거지', '500', '부수입>기타', ''),
  createData('10.15', '심부름', '1000', '부수입>기타', ''),
  createData('10.15', '용돈', '10,000', '부수입>기타', '까까비'),
  createData('10.08', '월급', '2,000,000', '월급>월급', ''),
  createData('10.10', '옆돌기 재롱부리기', '2,000', '부수입>기타', '다음엔 앞구르기를..'),
  createData('10.15', '설거지', '500', '부수입>기타', ''),
  createData('10.15', '심부름', '1000', '부수입>기타', ''),
  createData('10.15', '용돈', '10,000', '부수입>기타', '까까비'),
];

const SavingsWrap = () => {
  // const [rows, setRows] = useState([{ data: '', detail: '', amount: '', category: '', etc: '' }]);
  return (
    <>
      <Header />
      <Box>
        <Box
          sx={{
            minHeight: '50px',
            bgcolor: 'pink',
            display: 'flex',
            mb: '5px',
          }}
        >
          <Box sx={{ flex: 1, bgcolor: 'green', mr: '5px' }}>
            <Typography sx={{ fontSize: '24px', textAlign: 'end', lineHeight: 2, pr: '10px' }}>
              수입 합계: 000,000원
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, bgcolor: 'orange' }}>
            <Typography sx={{ flex: 1, fontSize: '24px', textAlign: 'end', lineHeight: 2 }}>
              지출 합계: 000,000원
            </Typography>
            <Typography
              sx={{ flex: 1, fontSize: '24px', textAlign: 'end', lineHeight: 2, pr: '10px' }}
            >
              수입 합계: 000,000원
            </Typography>
          </Box>
        </Box>

        {/* 테이블 */}
        <TableContainer component={Paper} sx={{ bgcolor: 'skyblue', maxHeight: 730 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '150px' }}>날짜</TableCell>
                <TableCell sx={{ width: '450px' }}>사용내역</TableCell>
                <TableCell sx={{ width: '250px' }}>금액</TableCell>
                <TableCell sx={{ width: '200px' }}>분류</TableCell>
                <TableCell sx={{ width: '340px' }}>기타</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map(row => (
                <TableRow key={row.date}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.etc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SavingsWrap;
