import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Grid2,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import TopSectionLineChart from './TopSectionLineChart';
import PentagonIcon from '@mui/icons-material/Pentagon';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));

//  <Grid2 size={{ xs: 6, md: 7 }}>xs=6 md=7이나 6.8? ---6.8은 header랑 딱 맞음. 7하려면 header크기 조정 필요---</Grid2>

const TopSection = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: '20px' }}>
      <Grid2 container spacing={5}>
        <Grid2 size={{ xs: 6, md: 7.25 }}>
          <Paper elevation={0} sx={{ bgcolor: '#ddd', minHeight: '350px', p: 1 }}>
            <Card variant='none'>
              <Typography variant='subtitle2' sx={{ fontSize: '20px', mb: '20px' }}>
                지출과 수입의 균형
              </Typography>
              {/* <Stack> */}
              <Stack
                direction='row'
                spacing={1}
                sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}
              >
                <Typography sx={{ fontSize: '38px' }}>₩ 1,200,000</Typography>
                <Chip label='+35%' sx={{ bgcolor: '#acffaa', color: '#028200' }} />
                {/* </Stack> */}
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  mb: '20px',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '18px', color: '#484848' }}>이달 수입 </Typography>
                  <Typography sx={{ fontSize: '20px' }}>+ ₩ 157,000 </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '18px', color: '#484848' }}>이달 지출 </Typography>
                  <Typography sx={{ fontSize: '20px' }}>- ₩ 9,000 </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '18px', color: '#484848' }}>이달 잔액 </Typography>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>+ ₩ 148,000</Typography>
                </Box>
              </Box>
              <Box sx={{ height: '150px', textAlign: 'center', mb: '5px' }}>
                <TopSectionLineChart />
              </Box>
            </Card>
          </Paper>
        </Grid2>
        {/* 두번째 박스 */}
        <Grid2 size={{ xs: 6, md: 4.75 }}>
          <Paper elevation={0} sx={{ bgcolor: '#aaa', minHeight: '350px', p: 1 }}>
            <Card variant='none' sx={{ bgcolor: '#5cb74c' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  mb: '10px',
                }}
              >
                <Typography variant='subtitle2' sx={{ fontSize: '20px', mb: '20px' }}>
                  가계부
                </Typography>
                <ButtonGroup
                  variant='outlined'
                  aria-label='button group'
                  sx={{ bgcolor: '#319220' }}
                >
                  <Button>
                    <PentagonIcon sx={{ color: '#fff' }} />
                  </Button>
                  <Button>
                    <BarChartIcon sx={{ color: '#fff' }} />
                  </Button>
                  <Button>
                    <PieChartIcon sx={{ color: '#fff' }} />
                  </Button>
                </ButtonGroup>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'flex-end',
                  mb: '20px',
                }}
              >
                <Box sx={{ mr: '10px', border: '1px solid #aaa' }}>
                  <PentagonIcon sx={{ fontSize: '250px', color: '#ccc' }} />
                </Box>
                <Box>
                  <Box>
                    <Typography sx={{ fontSize: '20px', textAlign: 'end', color: '#fff' }}>
                      예산
                    </Typography>
                    <Typography sx={{ fontSize: '24px', textAlign: 'end', color: '#fff' }}>
                      273,800
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '20px', textAlign: 'end', color: '#fff' }}>
                      지출
                    </Typography>
                    <Typography sx={{ fontSize: '24px', textAlign: 'end', color: '#fff' }}>
                      3,800
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '20px', textAlign: 'end' }}>남은 예산</Typography>
                    <Typography sx={{ fontSize: '24px', textAlign: 'end' }}>270,000</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default TopSection;
