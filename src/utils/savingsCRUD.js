import axios from 'axios';
import savings from '../data/savings.json';

const isBackendAvailable = false; // true로 설정하면 API 사용

// Read
export const getSavings = async () => {
  try {
    if (isBackendAvailable) {
      // API에서 가져오기
      const res = await axios.get('https://your-backend-server.com/api/savings');
      return res.data;
    } else {
      // JSON파일에서 가져오기
      // const res = await axios.get('/data/savings.json');
      // return savings.data;
      // console.log(savings, 'json의 res');
      return savings;
    }
  } catch {
    error;
  }
  {
    console.error('savings데이터 가져오기 오류', error);
    return [];
  }
};

// Create
export const addSavings = async newData => {
  try {
    const data = await getSavings();
    newData.id = data.length > 0 ? data[data.length - 1].id + 1 : 1; // 새로운 ID 생성

    if (isBackendAvailable) {
      // API에 새 데이터 추가 요청
      await axios.post('https://your-backend-server.com/api/savings', newData);
    } else {
      // JSON 데이터에 새 항목 추가
      data.push(newData);
      // await saveToJsonFile(data);
    }
    console.log('New entry added successfully!', newData);
  } catch (error) {
    console.error('Error adding new entry:', error);
  }
};

// Update
export const updateSavings = async (id, updatedData) => {
  try {
    const data = await getSavings();
    const index = data.findIndex(entry => entry.id === id);

    if (index === -1) {
      console.error('Entry not found!');
      return data;
    }

    if (isBackendAvailable) {
      // API로 수정 요청
      await axios.put(`https://your-backend-server.com/api/savings/${id}`, updatedData);
    } else {
      // JSON 데이터 수정
      data[index] = { ...data[index], ...updatedData };
      // await saveToJsonFile(data);
    }
    console.log('Entry updated successfully!');
    return data; // 업데이트된 데이터 반환
  } catch (error) {
    console.error('Error updating entry:', error);
    return [];
  }
};

// Delete
export const deleteSavings = async id => {
  try {
    const data = await getSavings();

    if (isBackendAvailable) {
      // API로 삭제 요청
      await axios.delete(`https://your-backend-server.com/api/savings/${id}`);
    } else {
      // JSON 데이터에서 삭제
      const updatedData = data.filter(entry => entry.id !== id);
      // await saveToJsonFile(updatedData);
      return updatedData;
    }
  } catch (error) {
    console.error('Error deleting entry:', error);
    return [];
  }
};
