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

// Delete1 - 개별 및 여러 개 삭제 ids:[1] or ids:[1,2,3]
export const deleteSavings = async ids => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('Invalid input: ids must be a non-empty array.');
    }
    const response = await axios.delete(`${API_BASE_URL}/savings`, { data: { ids } });

    return response.data.updatedData; // 서버에서 최신 데이터를 받아서 반환
  } catch (error) {
    console.error('Error deleting public expense:', error);
    throw error;
  }
};
// Delete2 - 전체 삭제 ids: 'all
export const deleteAllSavings = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/savings`, { data: { ids: 'all' } });

    return response.data.updatedData; // 서버에서 최신 데이터를 받아서 반환
  } catch (error) {
    console.error('Error deleting all public expenses:', error);
    throw error;
  }
};
