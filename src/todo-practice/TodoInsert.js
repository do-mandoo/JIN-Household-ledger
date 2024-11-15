import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';

const FormWrap = styled.form`
  display: flex;
  background: #495057;
`;
const InputStyle = styled.input`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;
  &::placeholder {
    color: #dee2e6;
  }
  flex: 1;
`;
const ButtonStyle = styled.button`
  background: none;
  outline: none;
  border: none;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background ease-in;
  &:hover {
    background: #adb5db;
  }
`;

const TodoInsert = () => {
  return (
    <FormWrap>
      <InputStyle placeholder='할 일 입력' />
      <ButtonStyle type='submit'>
        <AddIcon />
      </ButtonStyle>
    </FormWrap>
  );
};

export default TodoInsert;
