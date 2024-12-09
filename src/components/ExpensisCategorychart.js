import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box, Typography } from '@mui/material';

const ExpensisCategorychart = ({ data, categories }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove(); // 기존 차트 삭제 (리렌더링 방지)

    const margin = { top: 20, right: 20, bottom: 20, left: 50 };
    const width = 1400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const x0 = d3
      .scaleBand()
      .domain(categories.map(d => d))
      .range([0, width])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(['공금지출', '개인지출'])
      .range([0, x0.bandwidth()])
      .padding(0.1);

    // 데이터 처리
    const groupedData = categories.map(category => {
      return {
        category,
        values: [
          {
            group: '공금지출',
            amount: data
              .filter(d => d.category.includes(category) && d.group === '공금지출')
              .reduce((sum, item) => sum + (item.amount || 0), 0),
          },
          {
            group: '개인지출',
            amount: data
              .filter(d => d.category.includes(category) && d.group === '개인지출')
              .reduce((sum, item) => sum + (item.amount || 0), 0),
          },
        ],
      };
    });

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(groupedData, group => d3.max(group.values, d => d.amount) * 1.1), // 두 그룹의 최대값을 고려
      ])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal(['#3f51b5', '#ff9800']);

    const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X축
    chart.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x0));

    // Y축
    chart.append('g').call(d3.axisLeft(y));

    // Bars
    chart
      .selectAll('.category-group')
      .data(groupedData)
      .enter()
      .append('g')
      .attr('class', 'category-group')
      .attr('transform', d => `translate(${x0(d.category)},0)`)
      .selectAll('rect')
      .data(d => d.values)
      .enter()
      .append('rect')
      .attr('x', d => x1(d.group))
      .attr('y', d => y(d.amount))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.amount))
      .attr('fill', d => color(d.group));
    // Add labels on top of bars
    chart
      .selectAll('text.category-group') // 'text' 요소에 클래스가 'category-group'인 텍스트를 선택
      .data(groupedData)
      .enter()
      .append('g')
      .attr('class', 'category-group') // 텍스트 요소에 'category-group' 클래스 추가
      .attr('transform', d => `translate(${x0(d.category)},0)`)
      .selectAll('text')
      .data(d => d.values)
      .enter()
      .append('text')
      .attr('x', d => x1(d.group) + x1.bandwidth() / 2) // 텍스트 중앙
      .attr('y', d => y(d.amount) - 5) // 막대 약간 위
      .attr('text-anchor', 'middle')
      .text(d => d.amount.toLocaleString()) // 금액 표시
      .style('fill', 'black') // 텍스트 색상
      .style('font-size', '12px'); // 글자 크기
  }, [data]);

  return (
    <Box>
      <svg ref={chartRef} width='100%' height='250'></svg>
    </Box>
  );
};

export default ExpensisCategorychart;
