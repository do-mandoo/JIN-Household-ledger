import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';

const RatioTableInvestments = ({ percentData, maxPercentData, onSaveMaxPercent }) => {
  // 자식 컴포넌트 내에서 편집용 최대 백분율 로컬 상태 관리
  const [localMaxPercent, setLocalMaxPercent] = useState(maxPercentData);

  // 상위에서 maxPercentData가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setLocalMaxPercent(maxPercentData);
  }, [maxPercentData]);

  // 전체 수량 합계 구하기
  const totalQuantity = percentData.reduce((acc, cur) => acc + cur.quantity, 0);

  // 종목별 비율 계산
  const stocksWithRatio = percentData.map(stock => {
    const ratio = (stock.quantity / totalQuantity) * 100;
    return {
      ...stock,
      ratio: ratio.toFixed(2), // 소수점 둘째 자리까지 표현
    };
  });

  // - 버튼 클릭: localMaxPercent 감소
  const handleDecrement = () => {
    setLocalMaxPercent(prev => (parseFloat(prev) || 0) - 1);
  };

  // + 버튼 클릭: localMaxPercent 증가
  const handleIncrement = () => {
    setLocalMaxPercent(prev => (parseFloat(prev) || 0) + 1);
  };

  // 숫자 입력 변경 시 처리
  const handleInputChange = e => {
    setLocalMaxPercent(e.target.value);
  };

  // 저장 버튼 클릭 시 상위 컴포넌트의 저장 함수 호출
  const handleSave = () => {
    onSaveMaxPercent(parseFloat(localMaxPercent));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>종목 별 투자 비중</Box>
        <Box>
          <Typography>최대 비중 설정 : {localMaxPercent}%</Typography>
          <Button variant='contained' onClick={handleDecrement}>
            -
          </Button>
          <TextField
            type='number'
            value={localMaxPercent}
            onChange={handleInputChange}
            size='small'
            sx={{ width: '80px', bgcolor: '#fff' }}
          />
          <Button variant='contained' onClick={handleIncrement}>
            +
          </Button>
          <Button variant='outlined' onClick={handleSave}>
            저장
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', height: '300px', mb: 2 }}>
        <Box sx={{ flex: 1, border: '1px solid #FFF', mr: 5 }}>차트 영역</Box>
        <Box
          sx={{
            flex: 3,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            gap: 2, // 항목 간 간격
            alignContent: 'baseline',
          }}
        >
          {stocksWithRatio.map((stock, index) => (
            <Box sx={{ display: 'flex' }}>
              <Box
                key={index}
                sx={{
                  // bgcolor: 'skyblue',
                  display: 'flex',
                  alignItems: 'center',
                  // width: '100%',
                  // height: '100%',
                  minWidth: '200px',
                  minHeight: '35px',
                  padding: '8px',
                  border: '1px solid #ccc',
                }}
              >
                <Typography sx={{ display: 'flex', flex: 2, pr: 1 }}>{stock.stockName}</Typography>
                <Typography sx={{ display: 'flex', flex: 2 }}>{stock.ratio}%</Typography>
                <Typography sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                  {parseFloat(stock.ratio) >= localMaxPercent && (
                    <Tooltip title='경고: 기준치를 초과했습니다.'>
                      <WarningIcon color='warning' sx={{ ml: 1 }} />
                    </Tooltip>
                  )}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RatioTableInvestments;
