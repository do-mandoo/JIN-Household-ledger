import axios from 'axios';
import { API_BASE_URL } from '../config';

// Read
export const getHavingStocks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/havingStocks`);
    return response.data; // 주식 목록 반환
  } catch (error) {
    console.error('주식 목록을 가져오는 중 오류 발생:', error);
    return [];
  }
};

// Create
export const addHavingStocks = async stock => {
  try {
    const response = await axios.post(`${API_BASE_URL}/havingStocks`, stock);
    return response.data;
  } catch (error) {
    console.error('새 주식을 추가하는 중 오류 발생:', error);
    return null;
  }
};

// Delete
export const deleteHavingStocks = async stockName => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/havingStocks`, {
      data: { stockName },
    });
    return response.data;
  } catch (error) {
    console.error('주식을 삭제하는 중 오류 발생:', error);
    return null;
  }
};
