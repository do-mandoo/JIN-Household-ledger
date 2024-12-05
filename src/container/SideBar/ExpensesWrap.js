import React from 'react';
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

const createMeetData = (date, details, amount, category, yn, etc) => {
  return { date, details, amount, category, yn, etc };
};
const createIndividualDatas = (date, details, amount, category, etc) => {
  return { date, details, amount, category, etc };
};
const rowMeetData = [
  createMeetData('10.08', '아이스크림 할인점', '8,000', '식비>간식비', '무', ''),
  createMeetData('10.10', '편의점', '2,000', '식비>기타', '무', ''),
  createMeetData('10.15', 'OTT결제', '25,000', '주거/통신>기타', '무', ''),
  createMeetData('10.15', '쿠팡에서 장봄', '90,000', '식비>기타', '유', ''),
  createMeetData('10.15', '택시', '14,000', '교통/차량>대중교통비', '유', ''),
];
const rowIndividualData = [
  createIndividualDatas('10.08', '아이스크림 할인점', '8,000', '식비>간식비', ''),
  createIndividualDatas('10.10', '편의점', '2,000', '식비>기타', ''),
  createIndividualDatas('10.15', 'OTT결제', '25,000', '주거/통신>기타', ''),
  createIndividualDatas('10.15', '쿠팡에서 장봄', '90,000', '식비>기타', ''),
  createIndividualDatas('10.15', '후불교통비빠져나감', '54,000', '교통/차량>대중교통비', ''),
  createIndividualDatas('10.08', '아이스크림 할인점', '8,000', '식비>간식비', ''),
  createIndividualDatas('10.10', '편의점', '2,000', '식비>기타', ''),
  createIndividualDatas('10.15', 'OTT결제', '25,000', '주거/통신>기타', ''),
  createIndividualDatas('10.15', '쿠팡에서 장봄', '90,000', '식비>기타', ''),
  createIndividualDatas('10.15', '후불교통비빠져나감', '54,000', '교통/차량>대중교통비', ''),
  createIndividualDatas('10.08', '아이스크림 할인점', '8,000', '식비>간식비', ''),
  createIndividualDatas('10.10', '편의점', '2,000', '식비>기타', ''),
  createIndividualDatas('10.15', 'OTT결제', '25,000', '주거/통신>기타', ''),
  createIndividualDatas('10.15', '쿠팡에서 장봄', '90,000', '식비>기타', ''),
  createIndividualDatas('10.15', '후불교통비빠져나감', '54,000', '교통/차량>대중교통비', ''),
];

const ExpensesWrap = () => {
  return (
    <>
      <Header />
      <Box>
        {/* -------------------------공금 지출----------------------*/}
        <Box sx={{ bgcolor: 'skyblue', mb: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '50px' }}>
            <Typography sx={{ fontSize: '24px', lineHeight: 2 }}>공금지출</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: '24px', lineHeight: 2 }}>지출 합계: 000,000원</Typography>
              <Typography sx={{ fontSize: '24px', lineHeight: 2 }}>정산 합계: 000,000원</Typography>
            </Box>
          </Box>

          {/* 공금지출 테이블 */}
          <TableContainer component={Paper} sx={{ bgcolor: 'blueviolet', maxHeight: 260 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>날짜</TableCell>
                  <TableCell>사용내역</TableCell>
                  <TableCell>금액</TableCell>
                  <TableCell>분류</TableCell>
                  <TableCell>정산유무</TableCell>
                  <TableCell>기타</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowMeetData.map(row => (
                  <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.details}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.yn}</TableCell>
                    <TableCell>{row.etc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* -------------------------개인 지출----------------------*/}
        <Box sx={{ bgcolor: 'greenyellow' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '50px' }}>
            <Typography sx={{ fontSize: '24px', lineHeight: 2 }}>개인지출</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: '24px', lineHeight: 2 }}>지출 합계: 000,000원</Typography>
              <Typography sx={{ fontSize: '24px', lineHeight: 2 }}>
                전체 지출 합계: 000,000원
              </Typography>
            </Box>
          </Box>

          {/* 개인 지출 테이블 */}
          <TableContainer component={Paper} sx={{ bgcolor: 'yellowgreen', maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>날짜</TableCell>
                  <TableCell>사용내역</TableCell>
                  <TableCell>금액</TableCell>
                  <TableCell>분류</TableCell>
                  <TableCell>기타</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowIndividualData.map(row => (
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
      </Box>
    </>
  );
};

export default ExpensesWrap;
