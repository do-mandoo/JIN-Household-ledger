import styled from '@emotion/styled';
import {
  Box,
  Card,
  Grid2,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
// import DashboardDonutchart from '../../charts/dashboard/DashboardDonutchart';
import { donutData } from '../../data/DonutData';
import BottomSectionLineChart from '../../charts/dashboard/BottomSectionLineChart';
import BottomSectionPieChart from '../../charts/dashboard/BottomSectionPieChart';

const BottomSection = () => {
  const data = donutData();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 6, md: 7.25 }}>
          <Paper elevation={0} sx={{ bgcolor: '#ddd', minHeight: '350px', p: 1 }}>
            <Card variant='none'>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='subtitle2' sx={{ fontSize: '20px', mb: '20px' }}>
                  투자 분석 추이
                </Typography>
                <Link to='/investmens'>
                  <Typography>투자 분석 더보기</Typography>
                </Link>
              </Box>
              <BottomSectionLineChart />
            </Card>
          </Paper>
        </Grid2>
        {/* 두번째 박스 */}
        <Grid2 size={{ xs: 6, md: 4.75 }}>
          <Paper elevation={0} sx={{ bgcolor: '#ddd', minHeight: '350px', p: 1 }}>
            <Card variant='none'>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='subtitle2' sx={{ fontSize: '20px', mb: '20px' }}>
                  수입
                </Typography>
                <Link to='/savings'>
                  <Typography>수입 추가 입력</Typography>
                </Link>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Stack>
                  <Box sx={{ display: 'flex' }}>
                    <Typography>월급</Typography>
                    <Typography>1,000,000</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography>이자</Typography>
                    <Typography>200,000</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography>배당금</Typography>
                    <Typography>000</Typography>
                  </Box>
                </Stack>
                {/* <DashboardDonutchart
                  data={data}
                  width={300}
                  height={260}
                  innerRadius={130}
                  outerRadius={100}
                /> */}
                <BottomSectionPieChart />
              </Box>
            </Card>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BottomSection;
