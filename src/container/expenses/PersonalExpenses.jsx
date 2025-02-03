import React, { useEffect, useState } from 'react';
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
  TextField,
  Button,
  Checkbox,
} from '@mui/material';

const PersonalExpenses = ({
  data,
  form,
  setForm,
  editingId,
  handleAdd,
  handleUpdate,
  handleDelete,
  handleDateFocus,
  handleEditClick,
  personalExpensesTotal,
  allExpensesTotal,
  personalSelectedIds,
  handlePersonalCheckboxChange,
  handlePersonalSelectAllClick,
  handleDeletePersonalSelected,
  handleDeleteAllPersonalcExpenses,
}) => {
  // yyyy-MM-dd 형식을 mm.dd로 변환
  const formatToMMDD = date => {
    const [year, month, day] = date.split('-');
    return `${month}.${day}`; // mm.dd 형식 반환
  };
  // 폼 데이터 변경
  const handleChange = e => {
    const { name, value } = e.target;
    // 날짜 필드는 사용자가 원하는 형식으로 입력할 수 있도록 유지
    if (name === 'date') {
      // yyyy-MM-dd 형식을 mm.dd로 변환
      const formattedDate = formatToMMDD(value);
      // setForm({ ...form, date: formattedDate });
      setForm(prev => ({ ...prev, date: formattedDate }));
      // } else if (name === 'isSettled') {
      //   const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
      //   if (value === 'true') {
      //     setForm(prev => ({ ...prev, isSettled: true }));
      //   } else if (value === 'false') {
      //     setForm(prev => ({ ...prev, isSettled: false }));
      //   } else {
      //     alert('true 또는 false만 입력 가능합니다.');
      //   }
    } else if (name === 'amount') {
      // amount는 숫자로 변환
      setForm(prev => ({ ...prev, amount: parseInt(value, 10) || 0 }));
      // } else if (type === 'checkbox') {
      //   // checkbox는 true/false 처리
      //   setForm(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
      // setForm({ ...form, [name]: value });
      // 기본 처리 (그 외 값들)
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '20px', lineHeight: 2 }}>개인지출</Typography>
            <Button
              onClick={handleDeletePersonalSelected}
              // disabled={personalSelectedIds.length === 0}
            >
              선택 삭제
            </Button>
            <Button
              onClick={handleDeleteAllPersonalcExpenses}
              // disabled={data.length === 0}
              // variant='contained'
              // color='warning'
            >
              전체 삭제
            </Button>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '20px', lineHeight: 2 }}>
              지출 합계: {personalExpensesTotal.toLocaleString()}원
            </Typography>
            <Typography sx={{ fontSize: '20px', lineHeight: 2, ml: '20px' }}>
              전체 지출 합계: {allExpensesTotal.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* 개인 지출 테이블 */}
        <TableContainer component={Paper} sx={{ maxHeight: 345 }}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                {/* 전체 선택 체크박스 */}

                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                    indeterminate={
                      personalSelectedIds.length > 0 && personalSelectedIds.length < data.length
                    }
                    checked={personalSelectedIds.length === data.length}
                    onChange={handlePersonalSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '14px' }}>날짜</TableCell>
                <TableCell sx={{ fontSize: '14px' }}>사용내역</TableCell>
                <TableCell sx={{ fontSize: '14px' }}>금액</TableCell>
                <TableCell sx={{ fontSize: '14px' }}>분류</TableCell>
                <TableCell sx={{ width: '40px', textAlign: 'center' }}>수정</TableCell>
                <TableCell sx={{ width: '40px', textAlign: 'center' }}>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => {
                const isSelected = personalSelectedIds.includes(row.id);
                return (
                  <TableRow key={row.id}>
                    {/* 개별 체크박스 */}
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isSelected}
                        onChange={e => handlePersonalCheckboxChange(e, row.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{row.date}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{row.details}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{row.amount}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{row.category}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditClick(row)}>수정</Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(row.id)}>삭제</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* 입력 폼 */}
        <Box
          sx={{ display: 'flex', bgcolor: '#fff', height: '50px', mt: '1px', borderRadius: '4px' }}
        >
          <TextField
            name='date'
            label='날짜'
            type='date' // 기본 날짜 선택 UI 제공
            value={form.date} // mm.dd 형식 표시
            onFocus={handleDateFocus} // 클릭(포커스) 시 오늘 날짜 설정
            onChange={handleChange} // 사용자가 입력한 값 반영 yyyy-mm-dd를 mm.dd 변환
          />
          <TextField name='details' label='사용내역' value={form.details} onChange={handleChange} />
          <TextField
            name='amount'
            label='금액'
            type='number'
            value={form.amount}
            onChange={handleChange}
          />
          <TextField name='category' label='분류' value={form.category} onChange={handleChange} />
          {editingId ? (
            <Button onClick={handleUpdate} variant='contained'>
              저장
            </Button>
          ) : (
            <Button onClick={handleAdd} variant='contained'>
              추가
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PersonalExpenses;
