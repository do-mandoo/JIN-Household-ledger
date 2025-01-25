import React, { useEffect, useState } from 'react';
import Header from '../container/Header';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
// import { savingsData, deleteSavings, updateSavings } from '../data/MockDatas';
import { getSavings, addSavings, updateSavings, deleteSavings } from '../utils/savingsCRUD';

const SavingsWrap = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    data: '',
    details: '',
    amount: '',
    category: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const savings = await getSavings(); // getSavings 함수 호출
      setData(savings); // 로컬 또는 API 데이터 로드
    };
    fetchData(); // 비동기 데이터 호출
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  // 폼 데이터 변경
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 데이터 추가
  const handleAdd = async () => {
    if (!form.date || !form.amount || !form.category) {
      alert('날짜, 금액, 분류는 필수 입력 항목입니다.');
      return;
    }

    const newData = {
      id: data.length + 1,
      ...form,
      amount: parseInt(form.amount, 10),
    };

    const updatedData = await addSavings(newData); // 새 데이터 추가
    setData(prevData => [...prevData, newData]); // 상태 업데이트
    setForm({ date: '', details: '', amount: '', category: '' }); // 폼 초기화
  };

  // const handleAdd = () => {
  //   if (!form.date || !form.amount || !form.category) {
  //     alert('날짜, 금액, 분류는 필수 입력 항목입니다.');
  //     return;
  //   }
  //   const newData = {
  //     id: data.length + 1,
  //     ...form,
  //     amount: parseInt(form.amount, 10),
  //   };
  //   // addSavings(newData);
  //   setData(prevData => [...prevData, newData]);
  //   setForm({ date: '', details: '', amount: '', category: '', etc: '' });
  // };

  // // 데이터 삭제
  // const handleDelete = async id => {
  //   const updatedData = await deleteSavings(id); // 데이터 삭제
  //   setData(updatedData); // 상태 업데이트
  // };

  // // 데이터 수정
  // const handleUpdate = async id => {
  //   const itemToEdit = data.find(item => item.id === id);
  //   if (!itemToEdit) return;

  //   const updatedDetails = prompt('수정할 사용내역을 입력하세요:', itemToEdit.details);
  //   const updatedAmount = prompt('수정할 금액을 입력하세요:', itemToEdit.amount);
  //   const updatedCategory = prompt('수정할 분류를 입력하세요:', itemToEdit.category);

  //   if (updatedDetails && updatedAmount && updatedCategory) {
  //     const updatedData = await updateSavings(id, {
  //       details: updatedDetails,
  //       amount: parseInt(updatedAmount, 10),
  //       category: updatedCategory,
  //     });

  //     setData(updatedData); // 상태 업데이트
  //   } else {
  //     alert('필수 항목은 비울 수 없습니다.');
  //   }
  // };

  //-----------------------------------------------------------------------------------------------------------
  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   console.log(name, value, 'name,value');

  //   setForm({ ...form, [name]: value });
  // };

  // const handleAdd = () => {
  //   if (!form.date || !form.amount || !form.category) {
  //     alert('날짜, 금액, 분류는 필수 입력 항목입니다.');
  //     return;
  //   }
  //   const newData = {
  //     id: data.length + 1,
  //     ...form,
  //     amount: parseInt(form.amount, 10),
  //   };
  //   // addSavings(newData);
  //   setData(prevData => [...prevData, newData]);
  //   setForm({ date: '', details: '', amount: '', category: '', etc: '' });
  // };

  const handleDelete = id => {
    deleteSavings(id);
    setData(data.filter(item => item.id !== id));
  };

  // const handleUpdate = id => {
  //   const updatedDetails = prompt('수정할 내용을 입력하세요:', '');
  //   if (updatedDetails) {
  //     const updatedData = { details: updatedDetails };
  //     updateSavings(id, updatedData);
  //     setData(data.map(item => (item.id === id ? { ...item, details: updatedDetails } : item)));
  //   }
  // };
  const handleUpdate = id => {
    // 현재 수정하려는 항목을 가져옴
    const itemToEdit = data.find(item => item.id === id);
    if (!itemToEdit) return;

    // 입력받아 수정할 필드들
    const updatedDetails = prompt('수정할 사용내역을 입력하세요:', itemToEdit.details);
    const updatedAmount = prompt('수정할 금액을 입력하세요:', itemToEdit.amount);
    const updatedCategory = prompt('수정할 분류를 입력하세요:', itemToEdit.category);
    const updatedEtc = prompt('수정할 기타 내용을 입력하세요:', itemToEdit.etc);

    // 모든 필드를 업데이트
    if (updatedDetails && updatedAmount && updatedCategory) {
      const updatedData = {
        details: updatedDetails,
        amount: parseInt(updatedAmount, 10) || itemToEdit.amount, // 숫자로 변환
        category: updatedCategory,
        etc: updatedEtc || '',
      };

      // IndexedDB 업데이트 (함수 호출)
      updateSavings(id, updatedData);

      // 로컬 state 업데이트
      setData(
        data.map(item =>
          item.id === id
            ? { ...item, ...updatedData } // 기존 데이터에 업데이트된 데이터 병합
            : item
        )
      );
    } else {
      alert('필수 항목 (사용내역, 금액, 분류)은 비울 수 없습니다.');
    }
  };
  //-----------------------------------------------------------------------------------------------------------

  return (
    <>
      <Header />
      <Box>
        <Box
          sx={{
            minHeight: '50px',

            display: 'flex',
            mb: '5px',
          }}
        >
          <Box sx={{ flex: 1, border: '1px solid #fff', mr: '5px' }}>
            <Typography sx={{ fontSize: '24px', textAlign: 'end', lineHeight: 2, pr: '10px' }}>
              수입 합계: 000,000원
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, border: '1px solid #fff' }}>
            <Typography sx={{ flex: 1, fontSize: '24px', textAlign: 'end', lineHeight: 2 }}>
              지출 합계: 000,000원
            </Typography>
            <Typography
              sx={{ flex: 1, fontSize: '24px', textAlign: 'end', lineHeight: 2, pr: '10px' }}
            >
              수입-지출: 000,000원
            </Typography>
          </Box>
        </Box>

        {/* 테이블 */}
        <TableContainer component={Paper} sx={{ maxHeight: 730 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '150px' }}>날짜</TableCell>
                <TableCell sx={{ width: '450px' }}>사용내역</TableCell>
                <TableCell sx={{ width: '250px' }}>금액</TableCell>
                <TableCell sx={{ width: '200px' }}>분류</TableCell>
                <TableCell sx={{ width: '40px', textAlign: 'center' }}>수정</TableCell>
                <TableCell sx={{ width: '40px', textAlign: 'center' }}>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{row.amount.toLocaleString()}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleUpdate(row.id)}>수정</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(row.id)}>삭제</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', bgcolor: '#fff', height: '50px' }}>
          <TextField name='date' label='날짜' value={form.date} onChange={handleChange} />
          <TextField name='details' label='사용내역' value={form.details} onChange={handleChange} />
          <TextField name='amount' label='금액' value={form.amount} onChange={handleChange} />
          <TextField name='category' label='분류' value={form.category} onChange={handleChange} />
          <Button onClick={handleAdd}>추가</Button>
        </Box>
      </Box>
    </>
  );
};

export default SavingsWrap;
