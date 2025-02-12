import React, { useEffect, useState } from 'react';
import RatioTableInvestments from './anaylsis-Investments/RatioTableInvestments';
import PortfolioTargetsInvestments from './anaylsis-Investments/PortfolioTargetsInvestments';
import { getHavingStocks } from '../../utils/HavingStocksCRD';
import { getMaxWeight, updateMaxWeight } from '../../utils/maxiWeightSettingCR';
import { Box } from '@mui/material';
import { getPortfolioInvestments } from '../../utils/portfolioTargetInvestmentsR';

const InvestmentsAnalysis = () => {
  const [percentData, setPercentData] = useState([]); // 보유 주식 데이터
  const [maxPercentData, setMaxPercentData] = useState(0); // 최대 백분율 상태 관리 (숫자로 저장)

  const [filteredData, setFilteredData] = useState([]);
  const [algoVersion, setAlgoVersion] = useState('algo_v1');
  const [algoOptions, setAlgoOptions] = useState([]);

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

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const { gndData, havingData } = await getPortfolioInvestments();

        // gndData에서 가능한 알고리즘 버전 옵션 추출 (존재하지 않으면 빈 배열)
        const options = gndData?.GNDRecommendations?.map(item => item.GNDAlgoVersion) || [];
        setAlgoOptions(options);

        if (gndData && gndData.GNDRecommendations) {
          // 선택한 algoVersion에 해당하는 추천 데이터를 찾음
          const recommendation = gndData.GNDRecommendations.find(
            rec => rec.GNDAlgoVersion === algoVersion
          );

          if (recommendation && Array.isArray(recommendation.data)) {
            // 보유 주식 목록 추출 (앞뒤 공백 제거)
            const holdingStockNames = havingData.map(stock => stock.stockName.trim());

            // 추천 데이터의 data 배열에서 보유 주식과 일치하는 항목 필터링
            const filtered = recommendation.data.filter(item => {
              return holdingStockNames.includes(item.GNDStockName.trim());
            });

            setFilteredData(filtered);
          } else {
            setFilteredData([]);
          }
        } else {
          setFilteredData([]);
        }
      } catch (error) {
        console.error('포트폴리오 데이터를 가져오는 중 오류 발생:', error);
        setFilteredData([]);
      }
    };

    fetchPortfolioData();
  }, [algoVersion]); // algoVersion이 변경될 때마다 재호출

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
      <PortfolioTargetsInvestments
        filteredData={filteredData}
        algoVersion={algoVersion}
        setAlgoVersion={setAlgoVersion}
        algoOptions={algoOptions}
      />
    </>
  );
};

export default InvestmentsAnalysis;
