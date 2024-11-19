import React from 'react';
import TodoListItem from './TodoListItem';
import styled from '@emotion/styled';

const TodoListWrap = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const Todolist = ({ todos, onRemove, onToggle }) => {
  return (
    <TodoListWrap>
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </TodoListWrap>
  );
};

export default Todolist;
