import React, { useEffect, useState } from 'react';
import RatioTableInvestments from './anaylsis-Investments/RatioTableInvestments';
import PortfolioTargetsInvestments from './anaylsis-Investments/PortfolioTargetsInvestments';
import { getHavingStocks } from '../../utils/HavingStocksCRD';
import { getMaxWeight, updateMaxWeight } from '../../utils/maxiWeightSettingCR';
import { Box } from '@mui/material';

const InvestmentsAnalysis = () => {
  const [percentData, setPercentData] = useState([]); // 보유 주식 데이터
  const [maxPercentData, setMaxPercentData] = useState(0); // 최대 백분율 상태 관리 (숫자로 저장)

  // 보유 주식 데이터 fetch
  useEffect(() => {
    const fetchPercentData = async () => {
      const res = await getHavingStocks();
      setPercentData(res);
    };
    fetchPercentData();
  }, []);

  // 최대 백분율 데이터
  useEffect(() => {
    const fetchMaxData = async () => {
      try {
        const res = await getMaxWeight();
        setMaxPercentData(res.maxPercent); // 객체에서 maxPercent 추출
      } catch (error) {
        console.error('최대 백분율 데이터를 불러오는 중 오류:', error);
      }
    };
    fetchMaxData();
  }, []);

  // 상위에서 저장함수를 만들어 하위에 전달할 수 있음
  const onSaveMaxPercent = async newMax => {
    try {
      const res = await updateMaxWeight(newMax); // 서버에 업데이트 요청
      setMaxPercentData(res.maxPercent);
      alert('최대 백분율이 저장되었습니다.');
    } catch (error) {
      console.error('최대 백분율 저장 중 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };
  return (
    <>
      <RatioTableInvestments
        percentData={percentData}
        maxPercentData={maxPercentData}
        onSaveMaxPercent={onSaveMaxPercent}
      />
      <PortfolioTargetsInvestments />
    </>
  );
};

export default InvestmentsAnalysis;
