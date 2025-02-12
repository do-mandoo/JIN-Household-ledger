import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getSavings } from '../../utils/savingsCRUD';

const SavingsChart = () => {
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savings = await getSavings(); // getSavings 함수 호출

        // 모든 카테고리 설정
        const categories = ['주수입', '부수입', '전월이월', '저축/보험'];

        // 카테고리별 합산 데이터 계산
        const categorySums = categories.reduce((acc, category) => {
          acc[category] = savings
            .filter(item => item.category.startsWith(category))
            .reduce((sum, item) => sum + item.amount, 0);
          return acc;
        }, {});

        setChartData({
          categories,
          series: [
            {
              name: '총 금액',
              data: categories.map(category => categorySums[category] || 0),
            },
          ],
        });
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    fetchData(); // 비동기 데이터 호출
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

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

export default SavingsChart;
