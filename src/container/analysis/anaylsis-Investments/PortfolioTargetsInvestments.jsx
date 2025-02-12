import {
  Box,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

const PortfolioTargetsInvestments = ({
  filteredData,
  algoVersion,
  setAlgoVersion,
  algoOptions,
}) => {
  return (
    <>
      <Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: '5px' }}>현재 사용하는 알고리즘:</Typography>
            <Select
              sx={{ bgcolor: '#fff', mb: '1px', height: '30px' }}
              value={algoVersion}
              onChange={e => setAlgoVersion(e.target.value)}
              label='Algo Version'
            >
              {algoOptions.map((algo, index) => (
                <MenuItem key={index} value={algo}>
                  {algo}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
            <Table stickyHeader size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>종목</TableCell>
                  <TableCell>수량</TableCell>
                  <TableCell>현재가격</TableCell>
                  <TableCell>목표가격</TableCell>
                  <TableCell>목표기간</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.GNDStockName}</TableCell>
                    <TableCell>{item.GNDPurchasePrice}</TableCell>
                    <TableCell>{item.GNDCurrentPrice}</TableCell>
                    <TableCell>{item.GNDGoalPrice}</TableCell>
                    <TableCell>{item.GNDGoalDay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default PortfolioTargetsInvestments;
