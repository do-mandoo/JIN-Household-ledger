import axios from 'axios';
import { API_BASE_URL } from '../config';

// Read
export const getMaxWeight = async () => {
  const response = await axios.get(`${API_BASE_URL}/maxiWeightSetting`);
  return response.data; // 서버에서 { maxPercent: 10 } 형태로 반환
};

// Update
export const updateMaxWeight = async maxPercent => {
  // maxPercent가 이미 숫자라면 객체로 감싸서 전송
  const response = await axios.post(`${API_BASE_URL}/maxiWeightSetting`, { maxPercent });
  return response.data;
};
