import axios from 'axios';
import { API_BASE_URL } from '../config';

// Read
export const getPortfolioInvestments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolioTargetsInvestments`);
    // 데이터가 undefined이면 기본값 설정
    const gndData = response.data?.gndData || null;
    const havingData = Array.isArray(response.data?.havingData) ? response.data.havingData : [];

    return { gndData, havingData };
  } catch (error) {
    console.error('목표기간을 가져오는 중 오류가 발생했습니다.', error);
    return { gndData: null, havingData: [] };
  }
};
