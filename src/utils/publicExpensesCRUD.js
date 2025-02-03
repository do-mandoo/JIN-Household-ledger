import axios from 'axios';
import { API_BASE_URL } from '../config';

// Read
export const getPublicExpenses = async () => {
  const response = await axios.get(`${API_BASE_URL}/publicExpenses`);
  return response.data;
};

// Create
export const addPublicExpense = async newData => {
  const response = await axios.post(`${API_BASE_URL}/publicExpenses`, newData);
  return response.data;
};

// Update
export const updatePublicExpense = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/publicExpenses/${id}`, updatedData);
  return response.data;
};

// Delete1 - 개별 및 여러 개 삭제 ids:[1] or ids:[1,2,3]
export const deletePublicExpense = async ids => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('Invalid input: ids must be a non-empty array.');
    }
    const response = await axios.delete(`${API_BASE_URL}/publicExpenses`, { data: { ids } });

    return response.data.updatedData; // 서버에서 최신 데이터를 받아서 반환
  } catch (error) {
    console.error('Error deleting public expense:', error);
    throw error;
  }
};
// Delete2 - 전체 삭제 ids: 'all
export const deleteAllPublicExpenses = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/publicExpenses`, { data: { ids: 'all' } });

    return response.data.updatedData; // 서버에서 최신 데이터를 받아서 반환
  } catch (error) {
    console.error('Error deleting all public expenses:', error);
    throw error;
  }
};
