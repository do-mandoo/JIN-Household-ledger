import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BottomSectionPieChart = () => {
  const [state, setState] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',

        height: 350, // 전체 차트 높이
        // width: 300, // 전체 차트 너비
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%', // 도넛의 크기 (내부 원 크기)
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200, // 반응형에서 차트 높이
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type='donut'
          height={state.options.chart.height}
        />
      </div>
      <div id='html-dist'></div>
    </div>
  );
};
export default BottomSectionPieChart;
