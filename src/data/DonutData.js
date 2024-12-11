// data.js의 데이터를 가져온다고 가정
// import { expensesData } from "./data";
import { expensesData } from './MockDatas';

export const donutData = () => {
  // meetExpenses와 individualExpenses 데이터를 병합
  const allExpenses = [...expensesData.meetExpenses, ...expensesData.individualExpenses];

  // category별로 그룹화 및 합산
  const categoryTotals = allExpenses.reduce((acc, expense) => {
    const category = expense.category.split(' > ')[0]; // 대분류만 사용
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  // D3.js용 데이터 포맷으로 변환
  return Object.entries(categoryTotals).map(([label, value]) => ({
    label,
    value,
  }));
};
