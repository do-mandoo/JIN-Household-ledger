import axios from 'axios';
import { API_BASE_URL } from '../config';

// const isBackendAvailable = false; // true로 설정하면 API 사용

// Read
export const getSavings = async () => {
  const response = await axios.get(`${API_BASE_URL}/savings`);
  return response.data;
};

// Create
export const addSavings = async newData => {
  const response = await axios.post(`${API_BASE_URL}/savings`, newData);
  return response.data;
};

// Update
export const updateSavings = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/savings/${id}`, updatedData);
  return response.data; // 서버가 병합한 데이터를 반환
};

// Delete
export const deleteSavings = async id => {
  await axios.delete(`${API_BASE_URL}/savings/${id}`);
  return id;
};
