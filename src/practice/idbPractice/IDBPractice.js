import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import InitDB from './InitDB';

const IDBPractice = () => {
  // const [id, setID] = useState('');
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [age, setAge] = useState('');
  // console.log(id, setID, name, setName, email, setEmail, age, setAge, 'hihi');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    age: '',
  });

  const [user, setUser] = useState(null); // 특정 사용자 데이터
  const [allUsers, setAllUsers] = useState([]); // 전체 사용자 데이터

  // 입력 값 변경 핸들러
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 데이터 추가
  const addUser = async user => {
    const db = await InitDB();
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    try {
      // await store.add({
      //   id,
      //   name,
      //   email,
      //   age,
      // }); // 데이터 추가
      await store.add(formData); // 데이터 추가
      await tx.done; // 트랜잭션 완료
      // 상태 초기화
      setFormData({ id: '', name: '', email: '', age: '' });
      console.log('User added:', formData);
    } catch (error) {
      console.log('데이터 추가 에러', error);
      alert('데이터를 추가하는데 실패했습니다. 아이디 중복이 아닌지 살펴보세요.');
    }
  };

  // 데이터 가져오기
  const fetchUser = async () => {
    const db = await InitDB();
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const userData = await store.get(formData.id);
    if (userData) {
      setUser(userData);
      console.log(`User fetched: ${JSON.stringify(userData)}`);
    } else {
      console.log(`No user found with ID: ${formData.id}`);
    }
  };

  // 데이터 수정하기
  const updateUser = async () => {
    const db = await InitDB();
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    try {
      // await store.put(formData);
      // 1. ID로 기존 데이터 검색
      const existingUser = await store.get(formData.id);

      // 2. 데이터가 존재할 경우에만 업데이트 수행
      if (existingUser) {
        await store.put(formData); // 기존 데이터 덮어쓰기
        console.log('수정 성공:', formData);
      } else {
        console.log('수정 실패: 존재하지 않는 ID');
        alert('해당 ID를 가진 사용자가 없습니다.');
      }

      await tx.done;
      console.log('수정 성공');
    } catch (error) {
      console.log('수정 실패', error);
    }
  };

  // 데이터 전체 가져오기
  const fetchAllUsers = async () => {
    const db = await InitDB();
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const allUserData = await store.getAll();
    if (allUserData) {
      setAllUsers(allUserData);
    } else {
      console.log('전체 데이터 가져오기 실패', `${formData}`);
    }
  };

  // 삭제하기
  const deleteUser = async () => {
    const db = await InitDB();
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    try {
      await store.delete(formData.id);
      await tx.done;
      console.log('삭제 성공');
    } catch (error) {
      console.log('삭제하기 실패', error);
    }
  };

  return (
    <Box>
      <Typography variant='h1' sx={{ ml: 20, mb: 4, fontSize: '50px' }}>
        idb를 사용하여 indexed DB 사용하기
      </Typography>
      <Box
        component='form'
        sx={{ ml: 5 }}
        spacing={2}
        direction='row'
        onSubmit={e => e.preventDefault()}
      >
        <TextField
          id='outlined-required'
          label='ID'
          name='id'
          value={formData.id}
          onChange={handleChange}
        />
        <TextField
          id='outlined-required'
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id='outlined-required'
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          id='outlined-required'
          label='Age'
          name='age'
          value={formData.age}
          onChange={handleChange}
        />
        <Box sx={{ mt: 2 }} spacing={2} direction='row'>
          <Button variant='outlined' color='primary' onClick={addUser}>
            저장하기
          </Button>
          <Button variant='outlined' color='secondary' onClick={fetchUser}>
            불러오기
          </Button>
          <Button variant='outlined' color='success' onClick={updateUser}>
            수정하기
          </Button>
          <Button variant='outlined' color='warning' onClick={deleteUser}>
            삭제하기
          </Button>
          <Button variant='outlined' color='error' onClick={fetchAllUsers}>
            모든 데이터 출력
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 4, ml: 4 }}>
        <Typography variant='h5'>불러온 사용자</Typography>
        {user ? (
          <Typography>
            ID: {user.id}, Name: {user.name}, Email: {user.email}, Age: {user.age}
          </Typography>
        ) : (
          <Typography>사용자를 선택해주세요.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4, ml: 4 }}>
        <Typography variant='h5'>전체 사용자</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map(u => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default IDBPractice;
