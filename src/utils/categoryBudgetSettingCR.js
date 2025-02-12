import axios from 'axios';
import { API_BASE_URL } from '../config';

// Read
export const getCategoryBudgetSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categoryBudgetSetting`);
    return response.data; // 예: { category: { "식비": { "totalBudget": 0 }, ... } }
  } catch (error) {
    console.error('카테고리 예산 데이터 GET 요청 실패:', error);
    throw error;
  }
};

// PUT: 카테고리 예산 데이터 업데이트하기
// updatedData는 전체 객체 형태여야 함 (예: { category: { "식비": { totalBudget: 100 }, ... } })
export const updateCategoryBudgetSettings = async updatedData => {
  try {
    const response = await axios.put(`${API_BASE_URL}/categoryBudgetSetting`, updatedData);
    return response.data;
  } catch (error) {
    console.error('카테고리 예산 데이터 PUT 요청 실패:', error);
    throw error;
  }
};
