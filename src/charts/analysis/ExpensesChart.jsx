import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getPublicExpenses } from '../../utils/publicExpensesCRUD';
import { getPersonalExpenses } from '../../utils/personalExpensesCRUD';

const ExpensesChart = () => {
  // 차트에 필요한 데이터 상태: x축 카테고리와 시리즈 데이터
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publicExpense = await getPublicExpenses();
        const personalExpense = await getPersonalExpenses();
        // 두 데이터를 하나의 배열로
        const expenses = [...publicExpense, ...personalExpense];

        // 모든 카테고리 설정
        const categories = [
          '식비',
          '주거/통신',
          '생활용품',
          '의복/미용',
          '건강/문화',
          '교육/육아',
          '교통/차량',
          '경조사/회비',
          '세금/이자',
          '용돈/기타',
          '저축/보험',
          '카드대금',
        ];

        // 각 카테고리별 합산 계산
        // expense.category가 '식비>간식'처럼 대분류와 소분류가 있을 수 있으므로,
        // startsWith로 대분류가 일치하는 항목들을 필터링합니다.
        const categorySums = categories.reduce((acc, category) => {
          acc[category] = expenses
            .filter(item => item.category && item.category.startsWith(category))
            .reduce((sum, item) => sum + Number(item.amount), 0);
          return acc;
        }, {});

        setChartData({
          categories,
          series: [
            {
              name: '총 지출',
              data: categories.map(category => categorySums[category] || 0),
            },
          ],
        });
      } catch (error) {
        console.error('지출 데이터 가져오기 실패', error);
      }
    };
    fetchData();
  }, []);
  const chartOptions = {
    chart: {
      type: 'bar',
      background: '#fff',
      foreColor: '#000',
    },
    theme: {
      mode: 'light',
    },
    xaxis: {
      categories: chartData.categories,
    },
    colors: ['#000'], // 블랙 컬러
  };
  return (
    <div>
      <Chart options={chartOptions} series={chartData.series} type='bar' height={350} />
    </div>
  );
};

export default ExpensesChart;
