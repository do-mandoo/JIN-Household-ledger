import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CategoryBudget from './analysis-Expenses/CategoryBudget';
import {
  getCategoryBudgetSettings,
  updateCategoryBudgetSettings,
} from '../../utils/categoryBudgetSettingCR';
import { getPublicExpenses } from '../../utils/publicExpensesCRUD';
import { getPersonalExpenses } from '../../utils/personalExpensesCRUD';

const ExpensesAnalysis = () => {
  const [budgetData, setBudgetData] = useState(null); // 서버에서 받아온 전체 데이터 (예: { category: { "식비": { totalBudget: 0 }, ... } })
  const [editData, setEditData] = useState({}); // 사용자가 수정할 데이터를 별도로 관리 (카테고리별 예산)

  const [publicData, setPublicData] = useState([]); // 공동 지출 데이터
  const [personalData, setPersonalData] = useState([]); // 개인 지출 데이터
  const [aggregatedData, setAggregatedData] = useState([]); // 두 데이터(공동지출과 개인지출)를 합산한 결과를 저장할 상태

  const [finalData, setFinalData] = useState([]); // 최종 테이블 데이터

  // 컴포넌트 마운트 시 서버로부터 예산 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryBudgetSettings();
        setBudgetData(data);
        // 편집용 데이터는 data.category를 사용 (객체 형태)
        setEditData(data.category);
      } catch (error) {
        console.error('카테고리 예산 데이터를 불러오는데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  // 공동지출과 개인지출을 가져옴
  // 공금 지출 데이터 가져오기(초기 한 번만 로딩함)
  // useEffect(() => {
  //   const fetchPublicExpenses = async () => {
  //     try {
  //       const response = await getPublicExpenses();
  //       setPublicData(response);
  //     } catch (error) {
  //       console.log('카테고리 예산에서 공금지출 데이터를 불러오는데 실패했습니다.', error);
  //     }
  //   };
  //   fetchPublicExpenses();
  // }, []);

  // // 개인 지출 데이터 가져오기(초기 한 번만 로딩함)
  // useEffect(() => {
  //   const fetchPersonalExpenses = async () => {
  //     try {
  //       const response = await getPersonalExpenses();
  //       setPersonalData(response);
  //     } catch (error) {
  //       console.log('카테고리 예산에서 개인지출 데이터를 불러오는데 실패했습니다.', error);
  //     }
  //   };
  //   fetchPersonalExpenses();
  // }, []);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const [publicResponse, personalResponse] = await Promise.all([
          getPublicExpenses(),
          getPersonalExpenses(),
        ]);

        setPublicData(publicResponse);
        setPersonalData(personalResponse);
      } catch (error) {
        console.log('지출 데이터를 불러오는데 실패했습니다.', error);
      }
    };

    fetchExpenses();
  }, []);

  // 공용, 개인 지출 데이터를 모두 가져온 후, 카테고리별 합산 수행
  useEffect(() => {
    // 두 데이터가 둘 다 비어있을때만 중단 (하나라도 있으면 집계 진행)
    if (publicData.length === 0 && personalData.length === 0) return;

    const combined = {};

    // // 공용 지출 데이터 처리
    // publicData.forEach(expense => {
    //   const category = expense.category;
    //   if (combined[category]) {
    //     combined[category] += expense.amount;
    //   } else {
    //     combined[category] = expense.amount;
    //   }
    // });
    // // 개인 지출 데이터 처리
    // personalData.forEach(expense => {
    //   const category = expense.category;
    //   if (combined[category]) {
    //     combined[category] += expense.amount;
    //   } else {
    //     combined[category] = expense.amount;
    //   }
    // });
    [...publicData, ...personalData].forEach(expense => {
      const category = expense.category;
      combined[category] = (combined[category] || 0) + expense.amount;
    });

    // 객체를 배열로 변환 (예: [{ category: '식비 > 간식', totalAmount: 38000 }, ...])
    const aggregatedArray = Object.entries(combined).map(([category, totalAmount]) => ({
      category,
      totalAmount,
    }));

    setAggregatedData(aggregatedArray);
  }, [publicData, personalData]);

  // editData와 aggregatedData를 병합하여 최종 데이터 생성
  useEffect(() => {
    if (!editData) return;

    // editData의 키와 aggregatedData의 키(카테고리) 모두를 합쳐서 유니크한 키 배열을 만듭니다.
    const editKeys = Object.keys(editData);
    const aggKeys = aggregatedData.map(item => item.category);
    const allKeys = Array.from(new Set([...editKeys, ...aggKeys]));

    // aggregatedData를 Map 객체로 변환하여 빠르게 조회
    const aggregatedMap = new Map(aggregatedData.map(item => [item.category, item.totalAmount]));

    // 모든 카테고리에 대해 병합
    const mergedData = allKeys.map(category => {
      const totalBudget = editData[category]?.totalBudget || 0;
      const totalAmount = aggregatedMap.get(category) || 0;
      const remainingBudget = totalBudget - totalAmount;
      return { category, totalBudget, totalAmount, remainingBudget };
    });

    // const mergedData = Object.keys(editData).map(category => {
    //   const totalBudget = editData[category]?.totalBudget || 0;
    //   const totalAmount = aggregatedData.find(item => item.category === category)?.totalAmount || 0;
    //   const remainingBudget = totalBudget - totalAmount;

    //   return { category, totalBudget, totalAmount, remainingBudget };
    // });

    // 기존 데이터와 비교하여 변경된 내용이 없으면 상태 업데이트하지 않음
    if (JSON.stringify(finalData) === JSON.stringify(mergedData)) return;

    // 지출 순위 계산 (지출이 많은 순서로 정렬)
    const rankedData = mergedData
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .map((item, index) => ({ ...item, rank: index + 1 }));

    setFinalData(rankedData);
  }, [editData, aggregatedData]);

  // 각 카테고리의 예산 입력 값이 변경될 때 editData 업데이트
  const handleChange = (categoryName, value) => {
    const updatedValue = Number(value) || 0;

    setEditData(prev => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        totalBudget: Number(value),
      },
    }));

    // '남은 예산'도 실시간 반영
    setFinalData(prev =>
      prev.map(item =>
        item.category === categoryName
          ? { ...item, totalBudget: updatedValue, remainingBudget: updatedValue - item.totalAmount }
          : item
      )
    );
  };

  // 전체 데이터를 업데이트하기 위한 저장 함수 (PUT 요청)
  const handleSave = async () => {
    const updatedData = { category: editData };
    try {
      const response = await updateCategoryBudgetSettings(updatedData);
      setBudgetData(response);
      alert('카테고리 예산이 업데이트되었습니다.');
    } catch (error) {
      console.error('카테고리 예산 업데이트 중 오류 발생:', error);
      alert('업데이트에 실패했습니다.');
    }
  };

  return (
    <Box>
      <CategoryBudget
        budgetData={budgetData}
        editData={editData}
        handleChange={handleChange}
        handleSave={handleSave}
        aggregatedData={aggregatedData}
        finalData={finalData}
      />
    </Box>
  );
};

export default ExpensesAnalysis;
