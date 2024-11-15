import React from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import Todolist from './Todolist';

const TApp = () => {
  return (
    <div>
      <TodoTemplate>
        <TodoInsert />
        <Todolist />
      </TodoTemplate>
    </div>
  );
};

export default TApp;
