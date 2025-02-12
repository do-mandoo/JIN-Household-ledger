import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTodayDate } from '../../utils/dateChangeToMMDD';

const AdviseStocks = ({
  adviseStocksData,
  interestedStocks,
  mergedStock,
  selectedAlgoVersion,
  setSelectedAlgoVersion,
  onAddInterestedStock,
  onDeleteInterestedStock,
}) => {
  const [newAdviseStockForm, setNewAdviseStockForm] = useState({
    date: '',
    stockName: '',
    quantity: '',
    currentPrice: '',
  });

  // yyyy-MM-dd 형식을 mm.dd로 변환
  const formatToMMDD = date => {
    const [year, month, day] = date.split('-');
    return `${month}.${day}`; // mm.dd 형식 반환
  };

  // 날짜 입력 필드가 포커스될 때 호출
  const handleDateFocus = () => {
    if (!newAdviseStockForm.date) {
      setNewAdviseStockForm({ ...newAdviseStockForm, date: getTodayDate() }); // 오늘 날짜를 mm.dd 형식으로 설정
    }
  };

  // 입력값 변경 핸들러
  const handleChange = e => {
    const { name, value } = e.target;
    const newValue =
      name === 'quantity' || name === 'purchasePrice'
        ? value === ''
          ? ''
          : parseInt(value, 10) || 0
        : value;

    setNewAdviseStockForm(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleAddStock = async () => {
    if (
      !newAdviseStockForm.date ||
      !newAdviseStockForm.stockName ||
      !newAdviseStockForm.quantity ||
      !newAdviseStockForm.currentPrice
    ) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    // ✅ `onAddInterestedStock` 내부에서도 보유 주식을 체크하기 때문에 중복 제거 가능
    const addedStock = await onAddInterestedStock(newAdviseStockForm);

    if (addedStock) {
      setNewAdviseStockForm({ date: '', stockName: '', quantity: '', currentPrice: '' });
    }
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ display: 'flex', alignItems: 'flex-end' }}>관심목록</Typography>
          <Select
            sx={{ bgcolor: '#fff', mb: '1px', height: '30px' }}
            value={selectedAlgoVersion}
            onChange={e => setSelectedAlgoVersion(e.target.value)}
          >
            {adviseStocksData.map(algo => (
              <MenuItem key={algo.algoVersion} value={algo.algoVersion}>
                {algo.algoVersion}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell>종목</TableCell>
                <TableCell>수량</TableCell>
                <TableCell>현재가격</TableCell>
                <TableCell>추천Advise</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mergedStock.map(stock => (
                <TableRow key={stock.stockName}>
                  <TableCell>{stock.stockName}</TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>{stock.currentPrice ? stock.currentPrice : 'N/A'}</TableCell>
                  <TableCell>{stock.algoAdvise}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        onDeleteInterestedStock(stock.stockName);
                      }}
                    >
                      삭제
                    </Button>
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
            value={newAdviseStockForm.date}
            onFocus={handleDateFocus}
            onChange={handleChange}
          />
          <TextField
            name='stockName'
            label='종목이름'
            size='small'
            value={newAdviseStockForm.stockName}
            onChange={handleChange}
          />
          <TextField
            name='quantity'
            label='수량'
            type='number'
            size='small'
            value={newAdviseStockForm.quantity}
            onChange={handleChange}
          />
          <TextField
            name='currentPrice'
            label='현재가격'
            type='number'
            size='small'
            value={newAdviseStockForm.currentPrice}
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

export default AdviseStocks;
