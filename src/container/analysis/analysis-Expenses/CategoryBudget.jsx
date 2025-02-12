import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

const CategoryBudget = ({ budgetData, handleChange, handleSave, finalData }) => {
  // 데이터가 로딩 중일 때 표시
  // if (!budgetData) return <div>로딩 중...</div>;

  return (
    <>
      <Box>
        <Box>
          <Typography>카테고리별 예산 설정</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>분류</TableCell>
                <TableCell>예산 설정</TableCell>
                <TableCell>지출</TableCell>
                <TableCell>남은 예산</TableCell>
                <TableCell>지출 순위</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalData.map(item => (
                <TableRow key={item.category}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <TextField
                      type='number'
                      value={item.totalBudget}
                      size='small'
                      sx={{ width: '100px' }}
                      onChange={e => handleChange(item.category, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>{item.totalAmount.toLocaleString()}원</TableCell>
                  <TableCell>{item.remainingBudget.toLocaleString()}원</TableCell>
                  <TableCell>{item.rank}위</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant='contained' onClick={handleSave} sx={{ m: 2 }}>
            저장
          </Button>
        </TableContainer>
      </Box>
    </>
  );
};

export default CategoryBudget;
