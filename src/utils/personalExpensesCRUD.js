import axios from 'axios';
import { API_BASE_URL } from '../config';

// Read
export const getPersonalExpenses = async () => {
  const response = await axios.get(`${API_BASE_URL}/personalExpenses`);
  return response.data;
};

// Create
export const addPersonalExpense = async newData => {
  const response = await axios.post(`${API_BASE_URL}/personalExpenses`, newData);
  return response.data;
};

// Update
export const updatePersonalExpense = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/personalExpenses/${id}`, updatedData);
  return response.data;
};

// Delete
export const deletePersonalExpense = async id => {
  await axios.delete(`${API_BASE_URL}/personalExpenses/${id}`);
  return id;
};
