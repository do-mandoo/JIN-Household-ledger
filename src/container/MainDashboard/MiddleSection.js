import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardDonutchart from '../../components/DashboardDonutchart';
import { donutData } from '../../data/DonutData';
import { Box, Card, Grid2, Paper, Typography } from '@mui/material';

const MiddleSection = () => {
  const data = donutData();

  return (
    // 150높이에 맞게 스타일링 조정하기
    <Box sx={{ Height: '150px', mb: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4' sx={{ fontSize: '20px' }}>
          지출
        </Typography>
        <Link to='/expenses'>
          <Typography>지출 모두보기</Typography>
        </Link>
      </Box>
      <Grid2
        container
        spacing={3}
        size={{ xs: 6, md: 5 }}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {data.map((item, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Paper>
              <Card
                variant='none'
                sx={{
                  p: 2,
                  display: 'flex',
                  // flexDirection: 'column',
                  alignItems: 'center',
                  // boxShadow: 3,
                  borderRadius: 2,
                  maxWidth: '300px',
                }}
              >
                <DashboardDonutchart
                  data={[item]}
                  width={120}
                  height={120}
                  innerRadius={40}
                  outerRadius={60}
                />
                <Box sx={{ m: '0 20px' }}>
                  <Typography
                    variant='subtitle1'
                    sx={{ mt: 2, fontSize: '24px', textAlign: 'end' }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ fontSize: '18px', color: '#242424', textAlign: 'end' }}
                  >
                    - {item.value.toLocaleString('ko-KR')} 원
                  </Typography>
                </Box>
              </Card>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default MiddleSection;
