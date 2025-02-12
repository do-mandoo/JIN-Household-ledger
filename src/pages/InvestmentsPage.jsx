import React, { useEffect, useState } from 'react';
import Header from '../container/Header';
import HavingStocks from '../container/investments/HavingStocks';
import AdviseStocks from '../container/investments/AdviseStocks';
import {
  addInterestedStock,
  deleteInterestedStock,
  getAdviseStocks,
} from '../utils/adviseStocksCRD';
import { addHavingStocks, deleteHavingStocks, getHavingStocks } from '../utils/HavingStocksCRD';
import { Box } from '@mui/material';

const InvestmentsPage = () => {
  const [havingStocksData, setHavingStocksData] = useState([]); // 보유 주식 목록
  const [adviseStocksData, setAdviseStocksData] = useState([]); // 알고리즘 추천 주식 목록
  const [interestedStocks, setInterestedStocks] = useState([]); // 사용자가 추가한 관심 주식 목록
  const [selectedAlgoVersion, setSelectedAlgoVersion] = useState(''); // 선택된 알고리즘 버전
  const [mergedStock, setMergedStock] = useState([]); // 보유 주식 + 추천 데이터가 병합된 데이터

  useEffect(() => {
    // 보유 주식 목록 가져오기
    const fetchHavingStocks = async () => {
      const stocksData = await getHavingStocks();
      setHavingStocksData(stocksData);
    };

    // 추천 주식 목록 가져오기
    const fetchAdviseStocks = async () => {
      const { adviseData, interestedData } = await getAdviseStocks();

      // 🔥 데이터 undefined 방지
      if (!Array.isArray(adviseData)) {
        console.error('❌ fetchAdviseStocks에서 adviseData 배열이 아님!', adviseData);
        return;
      }

      if (!adviseData || adviseData.length === 0) {
        console.error('❌ adviseStocks가 비어있음!');
        return;
      }

      // 🔥 `adviseData.algoRecommendations`이 undefined일 경우 기본값 설정
      adviseData.forEach(item => {
        if (!Array.isArray(item.stockRecommendations)) {
          console.error('❌ item.stockRecommendations가 undefined 또는 배열이 아님!', item);
          item.stockRecommendations = [];
        }
      });

      // 🔥 `map()` 실행 전에 안전한 데이터 보장
      const formattedData = adviseData.map(item => ({
        algoVersion: item.algoVersion,
        stockRecommendations: item.stockRecommendations || [], // undefined 방지
      }));

      // 🔥 데이터가 없으면 빈 배열로 설정 (undefined 방지)
      setAdviseStocksData(adviseData.length > 0 ? adviseData : []);
      setInterestedStocks(interestedData.length > 0 ? interestedData : []);

      if (formattedData.length > 0) {
        setSelectedAlgoVersion(formattedData[0].algoVersion); // 기본값 설정
      }
    };

    fetchHavingStocks();
    fetchAdviseStocks();
  }, []);

  // `map()` 실행 전에 데이터가 있는지 체크하여 에러 방지
  const safeAdviseStocksData = Array.isArray(adviseStocksData) ? adviseStocksData : [];

  useEffect(() => {
    if (!Array.isArray(havingStocksData) || havingStocksData.length === 0) return;
    if (!Array.isArray(adviseStocksData) || adviseStocksData.length === 0) return;
    if (!Array.isArray(interestedStocks)) return;

    if (!safeAdviseStocksData || safeAdviseStocksData.length === 0) return;

    // 선택된 알고리즘 버전에 맞는 데이터 필터링
    const algoData =
      adviseStocksData.find(algo => algo.algoVersion === selectedAlgoVersion)
        ?.stockRecommendations || [];

    // 🔥 `algoData`가 배열인지 체크
    if (!Array.isArray(algoData)) {
      console.error('❌ algoData가 배열이 아님!', algoData);
      return;
    }

    // 🔥 데이터가 없으면 빈 배열 반환
    if (!algoData || algoData.length === 0) {
      setMergedStock([]);
      return;
    }

    // 보유 주식 목록(havingStocksData)과 추천 주식 목록(algoAdvise)을 병합
    const merged = havingStocksData.map(holding => {
      const interestStock = algoData.find(inter => inter.stockName === holding.stockName);
      return {
        ...holding,
        algoAdvise: interestStock ? interestStock.algoAdvise : 'N/A', // 없으면 "N/A" 표시
        type: '보유 주식',
      };
    });

    // 관심 주식 목록(interestedStocks)도 추천 주식 목록(algoAdvise) 병합
    const interestedMerged = interestedStocks
      .filter(stock => !havingStocksData.some(having => having.stockName === stock.stockName)) // 🔥 보유 주식 제외
      .map(stock => {
        const interestStock = algoData.find(inter => inter.stockName === stock.stockName);
        return {
          ...stock,
          algoAdvise: interestStock ? interestStock.algoAdvise : 'N/A',
          type: '관심 주식',
        };
      });

    setMergedStock([...merged, ...interestedMerged]);
  }, [havingStocksData, adviseStocksData, interestedStocks, selectedAlgoVersion]);

  // 새 주식 추가
  const handleAddHavingStock = async newHavingStockForm => {
    if (
      !newHavingStockForm.date ||
      !newHavingStockForm.stockName ||
      !newHavingStockForm.quantity ||
      !newHavingStockForm.purchasePrice
    ) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    // 입력값을 숫자로 변환 (NaN방지)
    const stockToAdd = {
      ...newHavingStockForm,
      stockName: newHavingStockForm.stockName.toLocaleUpperCase(),
      quantity: parseInt(newHavingStockForm.quantity, 10) || 0,
      purchasePrice: parseInt(newHavingStockForm.purchasePrice, 10) || 0,
    };

    const addedStock = await addHavingStocks(stockToAdd);
    if (addedStock) {
      // 기존 주식이 업데이트된 경우, 기존 목록에서 찾아서 업데이트
      setHavingStocksData(prevStocks => {
        const existingStockIndex = prevStocks.findIndex(
          stock => stock.stockName === addedStock.stockName
        );
        if (existingStockIndex !== -1) {
          const updatedStocks = [...prevStocks];
          updatedStocks[existingStockIndex] = addedStock; // 기존 주식 업데이트
          return updatedStocks;
        }
        return [...prevStocks, addedStock]; // 새로운 주식 추가
      });
    }
  };

  // 주식 삭제
  const handleDeleteHavingStock = async stockName => {
    const deletedStock = await deleteHavingStocks(stockName);
    if (deletedStock) {
      setHavingStocksData(prevStocks => prevStocks.filter(stock => stock.stockName !== stockName));
    }
  };

  // -----------------------adviseStock---------------------------------
  // 보유 주식 확인 함수 (중복 제거)
  const isStockAlreadyOwned = stockName => {
    return havingStocksData.some(stock => stock.stockName === stockName);
  };

  // 관심 주식 추가
  const onAddInterestedStock = async newStock => {
    if (!newStock.date || !newStock.stockName || !newStock.quantity || !newStock.currentPrice) {
      alert('모든 필드를 입력하세요.');
      return null;
    }

    // 함수로 분리하여 중복 제거
    if (isStockAlreadyOwned(newStock.stockName)) {
      alert(`'${newStock.stockName}'은(는) 이미 보유 중입니다.`);
      return null;
    }

    const addedStock = await addInterestedStock(newStock);

    if (addedStock) {
      setInterestedStocks([...interestedStocks, addedStock]); // UI 업데이트
      return addedStock;
    }
    return null;
  };

  // 관심 주식 삭제
  const onDeleteInterestedStock = async stockName => {
    const deleted = await deleteInterestedStock(stockName);

    if (deleted) {
      setInterestedStocks(prevStocks => prevStocks.filter(stock => stock.stockName !== stockName));
    } else {
      alert('보유중인 주식은 여기서 삭제할 수 없습니다.');
      return;
    }
  };

  return (
    <>
      <Header />
      <HavingStocks
        havingStocksData={havingStocksData}
        setHavingStocksData={setHavingStocksData}
        onAddStock={handleAddHavingStock}
        onDeleteStock={handleDeleteHavingStock}
      />
      <AdviseStocks
        havingStocksData={havingStocksData}
        adviseStocksData={adviseStocksData}
        interestedStocks={interestedStocks}
        mergedStock={mergedStock}
        selectedAlgoVersion={selectedAlgoVersion}
        setSelectedAlgoVersion={setSelectedAlgoVersion}
        onAddInterestedStock={onAddInterestedStock}
        onDeleteInterestedStock={onDeleteInterestedStock}
      />
      <Box sx={{ height: 300, bgcolor: '#FFF', mt: 5 }}></Box>
    </>
  );
};

export default InvestmentsPage;
