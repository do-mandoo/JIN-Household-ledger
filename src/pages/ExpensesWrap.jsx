import React from 'react';
import Header from '../container/Header';
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

const tableCellStyle = '';

const ExpensesWrap = () => {
  return (
    <>
      <Header />
      <Box>
        {/* -------------------------공금 지출----------------------*/}
        <Box sx={{ mb: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '50px' }}>
            <Typography sx={{ fontSize: '26px', lineHeight: 2 }}>공금지출</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: '26px', lineHeight: 2 }}>지출 합계: 000,000원</Typography>
              <Typography sx={{ fontSize: '26px', lineHeight: 2, ml: '20px' }}>
                정산 합계: 000,000원
              </Typography>
            </Box>
          </Box>

          {/* 공금지출 테이블 */}
          <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '18px' }}>날짜</TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>사용내역</TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>금액</TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>분류</TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>정산유무</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowMeetData.map(row => (
                  <TableRow key={row.date}>
                    <TableCell sx={{ fontSize: '18px' }}>{row.date}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.details}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.amount}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.category}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.yn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* -------------------------개인 지출----------------------*/}
        <Box sx={{}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '50px' }}>
            <Typography sx={{ fontSize: '26px', lineHeight: 2 }}>개인지출</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: '26px', lineHeight: 2 }}>지출 합계: 000,000원</Typography>
              <Typography sx={{ fontSize: '26px', lineHeight: 2, ml: '20px' }}>
                전체 지출 합계: 000,000원
              </Typography>
            </Box>
          </Box>

          {/* 개인 지출 테이블 */}
          <TableContainer component={Paper} sx={{ maxHeight: 385 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '18px' }}>날짜</TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>사용내역</TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>금액</TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>분류</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowIndividualData.map(row => (
                  <TableRow key={row.date}>
                    <TableCell sx={{ fontSize: '18px' }}>{row.date}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.details}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.amount}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.category}</TableCell>
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
