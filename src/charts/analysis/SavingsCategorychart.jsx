import { Box } from '@mui/material';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const SavingsCategorychart = ({ data, categories }) => {
  const chartRef = useRef();

  // 데이터를 카테고리별로 합산
  const sumAmountData = d3
    .rollups(
      data,
      v => d3.sum(v, d => d.amount), // 각 카테고리의 총 금액 계산
      d => d.category // 카테고리별 그룹화
    )
    .map(([category, amount]) => ({ category, amount }));

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove(); // 기존 차트 삭제 (리렌더링 방지)

    const margin = { top: 20, right: 20, bottom: 20, left: 50 };
    const width = 1400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(categories.map(d => d))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(sumAmountData, d => d.amount) * 1.1])
      .nice()
      .range([height, 0]);

    const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X축
    chart.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));

    // Y축
    chart.append('g').call(d3.axisLeft(y));

    // Bar
    chart
      .selectAll('.bar')
      .data(sumAmountData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.amount))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.amount))
      .attr('fill', '#3f51b5');

    // Add labels on top of bars
    chart
      .selectAll('.text') // 'text' 요소에 클래스가 '.bar'인 텍스트를 선택
      .data(sumAmountData)
      .enter()
      .append('text')
      .attr('class', 'bar')
      .attr('x', d => x(d.category) + x.bandwidth() / 2) // 텍스트 중앙
      .attr('y', d => y(d.amount) - 5) // 막대 약간 위
      .attr('text-anchor', 'middle')
      .text(d => d.amount.toLocaleString()) // 금액 표시
      .style('fill', 'black') // 텍스트 색상
      .style('font-size', '12px'); // 글자 크기
  }, [sumAmountData]);

  return (
    <Box>
      <svg ref={chartRef} width='100%' height='250'></svg>
    </Box>
  );
};

export default SavingsCategorychart;
