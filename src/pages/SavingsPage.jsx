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
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getSavings,
  addSavings,
  updateSavings,
  deleteSavings,
  deleteAllSavings,
} from '../utils/savingsCRUD';

const SavingsPage = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    date: '',
    details: '',
    amount: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 항목 ID
  const [selectedId, setSelectedId] = useState([]); // checkbox에 check된 항목들 배열에 담기.

  // yyyy-MM-dd 형식을 mm.dd로 변환
  const formatToMMDD = date => {
    const [year, month, day] = date.split('-');
    return `${month}.${day}`; // mm.dd 형식 반환
  };
  // 오늘 날짜를 mm.dd 형식으로 가져오기
  const getTodayDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (2자리)
    const day = String(today.getDate()).padStart(2, '0'); // 일 (2자리)
    return `${month}.${day}`; // mm.dd 형식 반환
  };

  // 날짜 입력 필드가 포커스될 때 호출
  const handleDateFocus = () => {
    if (!form.date) {
      setForm({ ...form, date: getTodayDate() }); // 오늘 날짜를 mm.dd 형식으로 설정
    }
  };

  // 데이터 가져오기READ-GET
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

    // 날짜 필드는 사용자가 원하는 형식으로 입력할 수 있도록 유지
    if (name === 'date') {
      // yyyy-MM-dd 형식을 mm.dd로 변환
      const formattedDate = formatToMMDD(value);
      setForm({ ...form, date: formattedDate });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 개인 지출 개별 체크박스 변경 핸들러
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedId(prev => [...prev, id]);
    } else {
      setSelectedId(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  // 개인 지출 전체 선택 체크박스 핸들러
  const handleSelectAllClick = e => {
    if (e.target.checked) {
      setSelectedId(data.map(row => row.id)); // 모든 ID 선택
    } else {
      setSelectedId([]); // 전체 해제
    }
  };

  // 데이터 추가CREATE-POST
  const handleAdd = async () => {
    if (!form.date || !form.amount || !form.category) {
      alert('날짜, 금액, 분류는 필수 입력 항목입니다.');
      return;
    }

    const newData = {
      ...form,
      amount: parseInt(form.amount, 10),
    };

    const addedData = await addSavings(newData); // 서버에 새 데이터 추가 요청
    setData(prevData => [...prevData, addedData]); // 로컬 상태 업데이트
    setForm({ date: '', details: '', amount: '', category: '' }); // 폼 초기화
  };

  // 수정 버튼 클릭 시 데이터 로드
  const handleEditClick = row => {
    setForm({
      date: row.date,
      details: row.details,
      amount: row.amount,
      category: row.category,
    });
    setEditingId(row.id); // 현재 수정 중인 ID 설정
  };

  // 데이터 수정UPDATE-PUT
  const handleUpdate = async () => {
    if (!editingId) {
      alert('수정 중인 항목이 없습니다.');
      return;
    }

    const currentItem = data.find(item => item.id === editingId);
    const filteredData = Object.keys(form).reduce((result, key) => {
      if (form[key] && form[key] !== currentItem[key]) {
        result[key] = form[key];
      }
      return result;
    }, {});

    if (Object.keys(filteredData).length === 0) {
      alert('수정된 내용이 없습니다.');
      return;
    }

    try {
      const updated = await updateSavings(editingId, filteredData);
      setData(prevData =>
        prevData.map(item => (item.id === editingId ? { ...item, ...updated } : item))
      );
      setEditingId(null); // 수정 중인 ID 초기화
      setForm({ date: '', details: '', amount: '', category: '' }); // 폼 초기화
    } catch (error) {
      console.error('Update failed:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  // DELETE-DELETE 개별 삭제
  const handleDelete = async id => {
    try {
      await deleteSavings([id]); // API로 데이터 개별 삭제 배열로 전달하여 요청
      const updatedData = data.filter(item => item.id !== id); // 로컬 상태 업데이트
      setData(updatedData); // 상태 업데이트
    } catch (error) {
      console.error('Error deleting public expense:', error);
    }
  };

  // DELETE-DELETE 선택 삭제
  const handleDeletePublicSelected = async () => {
    if (selectedId.length === 0) {
      alert('삭제할 데이터를 선택해주세요.');
      return;
    }
    try {
      // 선택된 항목들을 삭제 요청
      await deleteSavings(selectedId); // 여러 개 삭제 요청

      // 삭제 후 로컬 상태 업데이트
      const updatedData = data.filter(item => !selectedId.includes(item.id));
      setData(updatedData);
      setSelectedId([]); // 선택 초기화
    } catch (error) {
      console.error('Error deleting selected public expenses:', error);
    }
  };

  // DELETE-DELETE 전체 삭제
  const handleDeleteAllSavings = async () => {
    try {
      await deleteAllSavings(); // 전체 삭제 요청
      setData([]); // 모든 데이터 삭제
      selectedId([]); // 선택 초기화
    } catch (error) {
      console.error('Error deleting all public expenses:', error);
    }
  };

  return (
    <>
      <Header />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '20px', lineHeight: 2 }}>수입내역</Typography>

            <Button onClick={handleDeletePublicSelected}>선택삭제</Button>
            <Button onClick={handleDeleteAllSavings}>전체삭제</Button>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '20px', textAlign: 'end', lineHeight: 2, pr: '10px' }}>
              수입 합계: {data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}원
            </Typography>
            <Typography
              sx={{ fontSize: '20px', textAlign: 'end', lineHeight: 2, mr: '20px', ml: '20px' }}
            >
              지출 합계: 000,000원
            </Typography>
            <Typography sx={{ fontSize: '20px', textAlign: 'end', lineHeight: 2, pr: '10px' }}>
              수입-지출: 000,000원
            </Typography>
          </Box>
        </Box>

        {/* 테이블 */}
        <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                {/* 전체 선택 체크박스 */}
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                    indeterminate={selectedId.length > 0 && selectedId.length < data.length}
                    checked={selectedId.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={{ width: '150px' }}>날짜</TableCell>
                <TableCell sx={{ width: '450px' }}>사용내역</TableCell>
                <TableCell sx={{ width: '250px' }}>금액</TableCell>
                <TableCell sx={{ width: '200px' }}>분류</TableCell>
                <TableCell sx={{ width: '40px', textAlign: 'center' }}>수정</TableCell>
                <TableCell sx={{ width: '40px', textAlign: 'center' }}>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => {
                const isSelected = selectedId.includes(row.id);
                return (
                  <TableRow key={row.id}>
                    {/* 개별 체크박스 */}
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isSelected}
                        onChange={e => handleCheckboxChange(e, row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.details}</TableCell>
                    <TableCell>{row.amount.toLocaleString()}</TableCell>
                    <TableCell>{row.category}</TableCell>
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

export default SavingsPage;
