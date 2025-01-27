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

// Delete
export const deletePublicExpense = async id => {
  await axios.delete(`${API_BASE_URL}/publicExpenses/${id}`);
  return id;
};
