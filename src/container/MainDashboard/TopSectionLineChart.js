// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const data = [
//   { date: '2024-12-01', value: 30 },
//   { date: '2024-12-02', value: 50 },
//   { date: '2024-12-03', value: 80 },
//   { date: '2024-12-04', value: 65 },
//   { date: '2024-12-05', value: 90 },
//   { date: '2024-12-06', value: 70 },
// ];

// const TopSectionLineChart = () => {
//   const svgRef = useRef();

//   useEffect(() => {
//     // SVG 설정
//     const svg = d3.select(svgRef.current).attr('width', 850).attr('height', 160);

//     const margin = { top: 20, right: 30, bottom: 50, left: 20 };
//     const width = 850 - margin.left - margin.right;
//     const height = 160 - margin.top - margin.bottom;

//     // 기존 차트 제거 (리렌더링 방지)
//     svg.selectAll('*').remove();

//     // 데이터 영역 그룹 생성
//     const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

//     // X축 스케일 (날짜)
//     const xScale = d3
//       .scaleTime()
//       .domain(d3.extent(data, d => new Date(d.date)))
//       .range([0, width]);

//     // Y축 스케일 (값)
//     const yScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, d => d.value) * 1.1])
//       .range([height, 0]);

//     // X축
//     chart
//       .append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat('%b %d')))
//       .selectAll('text')
//       .attr('transform', 'rotate(-45)')
//       .style('text-anchor', 'end');

//     // Y축
//     chart.append('g').call(d3.axisLeft(yScale));

//     // 라인 생성기
//     const line = d3
//       .line()
//       .x(d => xScale(new Date(d.date)))
//       .y(d => yScale(d.value))
//       .curve(d3.curveCatmullRom); // 부드러운 곡선

//     // 라인 추가
//     chart
//       .append('path')
//       .datum(data)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue')
//       .attr('stroke-width', 2) // 라인 굵기
//       .attr('d', line);

//     // 데이터 포인트 추가
//     chart
//       .selectAll('.circle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('cx', d => xScale(new Date(d.date)))
//       .attr('cy', d => yScale(d.value))
//       .attr('r', 4)
//       .attr('fill', 'orange');
//   }, [data]);

//   return <svg ref={svgRef}></svg>;
// };

// export default TopSectionLineChart;
