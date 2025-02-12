import axios from 'axios';
import { API_BASE_URL } from '../config';

// Read
export const getAdviseStocks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/adviseStocks`);

    // 🔥 데이터가 undefined이면 기본값 설정
    const adviseData = Array.isArray(response.data?.adviseData) ? response.data.adviseData : [];
    const interestedData = Array.isArray(response.data?.interestedData)
      ? response.data.interestedData
      : [];

    // 🔥 `adviseData.algoRecommendations`이 undefined이면 빈 배열 설정
    adviseData.forEach(item => {
      if (!Array.isArray(item.stockRecommendations)) {
        console.error('❌ item.stockRecommendations가 undefined 또는 배열이 아님!', item);
        item.stockRecommendations = [];
      }
    });

    return { adviseData, interestedData };
  } catch (error) {
    console.error('주식 목록을 가져오는 중 오류 발생:', error);
    return { adviseStocks: [], interestedStocks: [] };
  }
};

// POST - 관심 주식 추가
export const addInterestedStock = async stock => {
  try {
    const response = await axios.post(`${API_BASE_URL}/adviseStocks`, stock);
    return response.data;
  } catch (error) {
    console.error('관심 주식을 추가하는 중 오류 발생:', error);
    return null;
  }
};

// DELETE - 관심 주식 삭제
export const deleteInterestedStock = async stockName => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/adviseStocks`, {
      data: { stockName },
    });
    return response.data;
  } catch (error) {
    console.error('관심 주식을 삭제하는 중 오류 발생:', error);
    return null;
  }
};
