import React, { useEffect, useState } from 'react';
import Header from '../container/Header';
import { Box } from '@mui/material';
import PublicExpeses from '../container/expenses/PublicExpeses';
import PersonalExpenses from '../container/expenses/PersonalExpenses';
import {
  getPublicExpenses,
  addPublicExpense,
  updatePublicExpense,
  deletePublicExpense,
} from '../utils/publicExpensesCRUD';

import { getTodayDate } from '../utils/dateChangeToMMDD';
import {
  getPersonalExpenses,
  addPersonalExpense,
  updatePersonalExpense,
  deletePersonalExpense,
} from '../utils/personalExpensesCRUD';

const ExpensesPage = () => {
  const [publicExpensesTotal, setPublicExpensesTotal] = useState(0); // 공금 지출 합계
  const [publicSettledTotal, setPublicSettledTotal] = useState(0); // 공금 정산 합계
  const [personalExpensesTotal, setPersonalExpensesTotal] = useState(0); // 개인 지출 합계
  const [allExpensesTotal, setAllExpensesTotal] = useState(0); // 공금+지출 전체 합계

  const [publicExpensesData, setPublicExpensesData] = useState([]); // 공금 지출 데이터
  const [personalExpensesData, setPersonalExpensesData] = useState([]); // 개인 지출 데이터

  // 공금 지출 Form
  const [publicExpensesForm, setPublicExpensesForm] = useState({
    date: '',
    details: '',
    amount: '',
    category: '',
    isSettled: false,
  });
  // 공금 지출 Form
  const [personalExpensesForm, setPersonalExpensesForm] = useState({
    date: '',
    details: '',
    amount: '',
    category: '',
  });

  const [editingPublicId, setEditingPublicId] = useState(null); // 공금 지출 수정 ID
  const [editingPersonalId, setEditingPersonalId] = useState(null); // 개인 지출 수정 ID

  // 공금 지출 데이터 가져오기(초기 한 번만 로딩함)
  useEffect(() => {
    const fetchPublicExpenses = async () => {
      try {
        const response = await getPublicExpenses();
        setPublicExpensesData(response);
        calculatePublicExpensesTotals(response);
      } catch (error) {
        console.log('Error fetching public expenses:', error);
      }
    };

    fetchPublicExpenses();
  }, []);

  // 개인 지출 데이터 가져오기(초기 한 번만 로딩함)
  useEffect(() => {
    const fetchPersonalExpenses = async () => {
      try {
        const response = await getPersonalExpenses();
        setPersonalExpensesData(response);
        calculatePersonalExpensesTotals(response);
      } catch (error) {
        console.log('Error fetching personal expenses:', error);
      }
    };

    fetchPersonalExpenses();
  }, []);

  // 공금 지출 합계 계산 함수
  const calculatePublicExpensesTotals = data => {
    const total = data.reduce((sum, item) => sum + item.amount, 0); // 전체 합계 계산
    const settledTotal = data
      .filter(item => item.isSettled) // 정산된 항목 필터링
      .reduce((sum, item) => sum + item.amount, 0); // 정산 합계 계산

    setPublicExpensesTotal(total);
    setPublicSettledTotal(settledTotal);

    // allExpensesTotal 업데이트
    setAllExpensesTotal(total + personalExpensesTotal);
  };

  // 개인 지출 합계 계산 함수
  const calculatePersonalExpensesTotals = data => {
    const total = data.reduce((sum, item) => sum + item.amount, 0); // 전체 합계 계산
    setPersonalExpensesTotal(total);

    // allExpensesTotal 업데이트
    setAllExpensesTotal(publicExpensesTotal + total);
  };

  //--------------START--------- CRUD Logic for Public Expenses--------------------
  // CREATE-POST
  const handleAddPublicExpense = async () => {
    if (!publicExpensesForm.date || !publicExpensesForm.amount || !publicExpensesForm.category) {
      alert('날짜, 금액, 분류는 필수 입력 항목입니다.');
      return;
    }
    const newPublicExpenses = {
      ...publicExpensesForm,
      amount: parseInt(publicExpensesForm.amount, 10),
    };

    try {
      const addedData = await addPublicExpense(newPublicExpenses); // 서버에 새 데이터 추가
      const updatedData = [...publicExpensesData, addedData];
      setPublicExpensesData(updatedData); // 상태 업데이트
      calculatePublicExpensesTotals(updatedData); // 합계 재계산
      setPublicExpensesForm({
        date: '',
        details: '',
        amount: 0,
        category: '',
        isSettled: 'false',
      });
    } catch (error) {
      console.error('Error adding public expense:', error);
    }
  };

  // 날짜 입력 필드가 포커스될 때 호출
  const handlePublicDateFocus = () => {
    if (!publicExpensesForm.date) {
      setPublicExpensesForm(prev => ({ ...prev, date: getTodayDate() })); // 오늘 날짜를 mm.dd 형식으로 설정
    }
  };

  // 수정 버튼 클릭 시 데이터 로드
  const handlePublicEditClick = row => {
    setPublicExpensesForm({
      date: row.date,
      details: row.details,
      amount: row.amount,
      category: row.category,
      isSettled: row.isSettled,
    });
    setEditingPublicId(row.id); // 현재 수정 중인 ID 설정
  };

  // UPDATE-PUT
  const handleUpdatePublicExpense = async () => {
    if (!editingPublicId) {
      alert('수정 중인 항목이 없습니다.');
      return;
    }
    const currentItem = publicExpensesData.find(item => item.id === editingPublicId);
    const filteredData = Object.keys(publicExpensesForm).reduce((result, key) => {
      const value = publicExpensesForm[key];
      if (value && value !== currentItem[key]) {
        // 숫자 변환 로직 추가
        result[key] = key === 'amount' ? parseInt(value, 10) || 0 : value;
      }
      return result;
    }, {});
    if (Object.keys(filteredData).length === 0) {
      alert('수정된 내용이 없습니다.');
      return;
    }
    try {
      const updated = await updatePublicExpense(editingPublicId, filteredData);
      const updatedData = publicExpensesData.map(item =>
        item.id === editingPublicId ? { ...item, ...updated } : item
      );
      setPublicExpensesData(updatedData);
      calculatePublicExpensesTotals(updatedData);
      setEditingPublicId(null); // 수정 중인 ID 초기화
      setPublicExpensesForm({ date: '', details: '', amount: 0, category: '', isSettled: false }); // 폼 초기화
    } catch (error) {
      console.error('Update failed:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  //DELETE-DELETE
  const handledDletePublicExpense = async id => {
    try {
      await deletePublicExpense(id); // API로 데이터 삭제 요청
      const updatedData = publicExpensesData.filter(item => item.id !== id); // 로컬 상태 업데이트
      setPublicExpensesData(updatedData);
      calculatePublicExpensesTotals(updatedData);
    } catch (error) {
      console.error('Error deleting public expense:', error);
    }
  };
  //--------------END--------- CRUD Logic for Public Expenses--------------------
  //--------------START--------- CRUD Logic for Personal Expenses--------------------
  // CREATE-POST
  const handleAddPersonalExpense = async () => {
    if (
      !personalExpensesForm.date ||
      !personalExpensesForm.amount ||
      !personalExpensesForm.category
    ) {
      alert('날짜, 금액, 분류는 필수 입력 항목입니다.');
      return;
    }
    const newPersonalExpenses = {
      ...personalExpensesForm,
      amount: parseInt(personalExpensesForm.amount, 10),
    };

    try {
      const addedData = await addPersonalExpense(newPersonalExpenses); // 서버에 새 데이터 추가
      const updatedData = [...personalExpensesData, addedData];
      setPersonalExpensesData(updatedData); // 상태 업데이트
      calculatePersonalExpensesTotals(updatedData); // 합계 재계산
      setPersonalExpensesForm({
        date: '',
        details: '',
        amount: 0,
        category: '',
      });
    } catch (error) {
      console.error('Error adding personal expense:', error);
    }
  };

  // 날짜 입력 필드가 포커스될 때 호출
  const handlePersonalDateFocus = () => {
    if (!personalExpensesForm.date) {
      setPersonalExpensesForm(prev => ({ ...prev, date: getTodayDate() })); // 오늘 날짜를 mm.dd 형식으로 설정
    }
  };

  // 수정 버튼 클릭 시 데이터 로드
  const handlePersonalEditClick = row => {
    setPersonalExpensesForm({
      date: row.date,
      details: row.details,
      amount: row.amount,
      category: row.category,
    });
    setEditingPersonalId(row.id); // 현재 수정 중인 ID 설정
  };

  // UPDATE-PUT
  const handleUpdatePersonalExpense = async () => {
    if (!editingPersonalId) {
      alert('수정 중인 항목이 없습니다.');
      return;
    }
    const currentItem = personalExpensesData.find(item => item.id === editingPersonalId);
    const filteredData = Object.keys(personalExpensesForm).reduce((result, key) => {
      const value = personalExpensesForm[key];
      if (value && value !== currentItem[key]) {
        // 숫자 변환 로직 추가
        result[key] = key === 'amount' ? parseInt(value, 10) || 0 : value;
      }
      return result;
    }, {});
    if (Object.keys(filteredData).length === 0) {
      alert('수정된 내용이 없습니다.');
      return;
    }
    try {
      const updated = await updatePersonalExpense(editingPersonalId, filteredData);
      const updatedData = personalExpensesData.map(item =>
        item.id === editingPersonalId ? { ...item, ...updated } : item
      );
      setPersonalExpensesData(updatedData);
      calculatePersonalExpensesTotals(updatedData);
      setEditingPersonalId(null); // 수정 중인 ID 초기화
      setPersonalExpensesForm({ date: '', details: '', amount: 0, category: '' }); // 폼 초기화
    } catch (error) {
      console.error('Update failed:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  //DELETE-DELETE
  const handledDletePersonalExpense = async id => {
    try {
      await deletePersonalExpense(id); // API로 데이터 삭제 요청
      const updatedData = personalExpensesData.filter(item => item.id !== id); // 로컬 상태 업데이트
      setPersonalExpensesData(updatedData);
      calculatePersonalExpensesTotals(updatedData);
    } catch (error) {
      console.error('Error deleting personal expense:', error);
    }
  };
  //--------------END--------- CRUD Logic for Personal Expenses--------------------

  return (
    <>
      <Header />
      <Box>
        {/* --공금 지출-- */}
        <PublicExpeses
          data={publicExpensesData}
          form={publicExpensesForm}
          setForm={setPublicExpensesForm}
          editingId={editingPublicId}
          handleDateFocus={handlePublicDateFocus}
          handleEditClick={handlePublicEditClick}
          handleAdd={handleAddPublicExpense}
          handleUpdate={handleUpdatePublicExpense}
          handleDelete={handledDletePublicExpense}
          publicExpensesTotal={publicExpensesTotal}
          publicSettledTotal={publicSettledTotal}
        />

        {/* --개인 지출-- */}
        <PersonalExpenses
          data={personalExpensesData}
          form={personalExpensesForm}
          setForm={setPersonalExpensesForm}
          editingId={editingPersonalId}
          handleDateFocus={handlePersonalDateFocus}
          handleEditClick={handlePersonalEditClick}
          handleAdd={handleAddPersonalExpense}
          handleUpdate={handleUpdatePersonalExpense}
          handleDelete={handledDletePersonalExpense}
          personalExpensesTotal={personalExpensesTotal}
          allExpensesTotal={allExpensesTotal}
        />
      </Box>
    </>
  );
};

export default ExpensesPage;
