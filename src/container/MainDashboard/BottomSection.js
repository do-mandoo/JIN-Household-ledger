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
import DashboardDonutchart from '../../components/DashboardDonutchart';
import { donutData } from '../../data/DonutData';

const BottomSection = () => {
  const data = donutData();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, md: 7 }}>
          <Paper elevation={0} sx={{ bgcolor: '#ddd', minHeight: '350px', p: 1 }}>
            <Card variant='none'>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='subtitle2' sx={{ fontSize: '20px', mb: '20px' }}>
                  입출금 내역
                </Typography>
                <Link to='/expenses'>
                  <Typography>지출 추가 입력</Typography>
                </Link>
              </Box>
              <TableContainer component={Paper} sx={{ bgcolor: 'peru' }}>
                <Table>
                  <TableBody>
                    {/* 5개의 열만 나열 */}
                    <TableRow>
                      <TableCell>10.2</TableCell>
                      <TableCell>아이스크림할인점</TableCell>
                      <TableCell>800원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10.5</TableCell>
                      <TableCell>아이스크림할인점</TableCell>
                      <TableCell>900원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10.6</TableCell>
                      <TableCell>아이스크림할인점</TableCell>
                      <TableCell>1000원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10.8</TableCell>
                      <TableCell>아이스크림할인점</TableCell>
                      <TableCell>1200원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10.10</TableCell>
                      <TableCell>아이스크림할인점</TableCell>
                      <TableCell>600원</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Paper>
        </Grid2>
        {/* 두번째 박스 */}
        <Grid2 size={{ xs: 6, md: 5 }}>
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
                <DashboardDonutchart
                  data={data}
                  width={300}
                  height={260}
                  innerRadius={130}
                  outerRadius={100}
                />
              </Box>
            </Card>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BottomSection;
