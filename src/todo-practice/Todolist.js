import React from 'react';
import TodoListItem from './TodoListItem';
import styled from '@emotion/styled';

const TodoListWrap = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const Todolist = () => {
  return (
    <TodoListWrap>
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </TodoListWrap>
  );
};

export default Todolist;
