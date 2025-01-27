// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const DashboardDonutchart = ({ data, width, height, innerRadius, outerRadius }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const svg = d3
//       .select(svgRef.current)
//       .attr('width', width)
//       .attr('height', height)
//       .style('overflow', 'visible');

//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//     // 데이터 그룹 제거 (리렌더링 방지)
//     svg.selectAll('*').remove();

//     const chartGroup = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

//     const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

//     const pieGenerator = d3.pie().value(d => d.value);

//     const pieData = pieGenerator(data);

//     // 도넛 조각 생성
//     chartGroup
//       .selectAll('.slice')
//       .data(pieData)
//       .enter()
//       .append('path')
//       .attr('class', 'slice')
//       .attr('d', arcGenerator)
//       .attr('fill', (d, i) => colorScale(i))
//       .attr('stroke', 'white')
//       .attr('stroke-width', 2);

//     // 레이블 추가
//     chartGroup
//       .selectAll('.label')
//       .data(pieData)
//       .enter()
//       .append('text')
//       .text(d => d.data.label)
//       .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
//       .attr('text-anchor', 'middle')
//       .attr('font-size', '10px')
//       .attr('fill', 'black');
//   }, [data, width, height, innerRadius, outerRadius]);

//   return <svg ref={svgRef}></svg>;
// };

// export default DashboardDonutchart;

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MiddleSectionPieChart = () => {
  const [state, setState] = useState({
    series: [44, 56],
    options: {
      chart: {
        type: 'donut',

        height: 150, // 전체 차트 높이
        // width: 300, // 전체 차트 너비
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%', // 도넛의 크기 (내부 원 크기)
          },
        },
      },
      legend: {
        show: false, // 반응형에서도 범례 제거
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200, // 반응형에서 차트 높이
            },
            legend: {
              // position: 'bottom',
              show: false,
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
export default MiddleSectionPieChart;
