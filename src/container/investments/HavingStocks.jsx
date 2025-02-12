import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { getTodayDate } from '../../utils/dateChangeToMMDD';

const HavingStocks = ({ havingStocksData, setHavingStocksData, onAddStock, onDeleteStock }) => {
  // const [havingStocksData, setHavingStocksData] = useState([]); // 주식 목록 상태
  const [newHavingStockForm, setNewHavingStockForm] = useState({
    date: '',
    stockName: '',
    quantity: '',
    purchasePrice: '',
  });

  // yyyy-MM-dd 형식을 mm.dd로 변환
  const formatToMMDD = date => {
    const [year, month, day] = date.split('-');
    return `${month}.${day}`; // mm.dd 형식 반환
  };

  // 날짜 입력 필드가 포커스될 때 호출
  const handleDateFocus = () => {
    if (!newHavingStockForm.date) {
      setNewHavingStockForm({ ...newHavingStockForm, date: getTodayDate() }); // 오늘 날짜를 mm.dd 형식으로 설정
    }
  };

  // 입력값 변경 핸들러
  const handleChange = e => {
    const { name, value } = e.target;
    // 날짜 필드는 사용자가 원하는 형식으로 입력할 수 있도록 유지
    if (name === 'date') {
      // yyyy-MM-dd 형식을 mm.dd로 변환
      const formattedDate = formatToMMDD(value);
      setNewHavingStockForm({ ...newHavingStockForm, havingStocksData: formattedDate });
    } else {
      setNewHavingStockForm({ ...newHavingStockForm, [name]: value });
    }
  };
  const handleAddStock = () => {
    onAddStock(newHavingStockForm);
    // 입력 필드 초기화
    setNewHavingStockForm({ date: '', stockName: '', quantity: '', purchasePrice: '' });
  };
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>주식 보유 현황</Box>
          <Box>총 주식 보유량:&nbsp;</Box>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                {/* 전체 선택 체크박스 */}
                {/* <TableCell padding='checkbox'>
                  <Checkbox color='primary' />
                </TableCell> */}
                <TableCell>종목</TableCell>
                <TableCell>주당가격</TableCell>
                <TableCell>수량</TableCell>
                {/* <TableCell>현재가격</TableCell> */}
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {havingStocksData.map(row => (
                <TableRow key={row.id}>
                  {/* 개별 체크박스 */}
                  {/* <TableCell padding='checkbox'>
                    <Checkbox color='primary' />
                  </TableCell> */}
                  <TableCell>{row.stockName}</TableCell>
                  <TableCell>{row.purchasePrice}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  {/* <TableCell>{row.currentPrice}</TableCell> */}
                  <TableCell>
                    <Button onClick={() => onDeleteStock(row.stockName)}>삭제</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* 입력 폼 */}
        <Box sx={{ display: 'flex', bgcolor: '#fff', mt: '1px', borderRadius: '4px' }}>
          <TextField
            name='date'
            label='날짜'
            type='date'
            size='small'
            value={newHavingStockForm.date}
            onFocus={handleDateFocus}
            onChange={handleChange}
          />
          <TextField
            name='stockName'
            label='종목이름'
            size='small'
            value={newHavingStockForm.stockName}
            onChange={handleChange}
          />
          <TextField
            name='quantity'
            label='수량'
            type='number'
            size='small'
            value={newHavingStockForm.quantity}
            onChange={handleChange}
          />
          <TextField
            name='purchasePrice'
            label='구매시점 가격'
            type='number'
            size='small'
            value={newHavingStockForm.purchasePrice}
            onChange={handleChange}
          />
          <Button onClick={handleAddStock} variant='contained'>
            추가
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HavingStocks;
