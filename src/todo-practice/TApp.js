import React, { useCallback, useReducer, useRef, useState } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import Todolist from './Todolist';

// 더미데이터
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 1500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

//useReducer사용
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가 {type:'INSERT', todo:{id:1, text:'todo', checked:false}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거 {type:'REMOVE', id:1}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': // 토글 {type:'TOGGLE', id:1}
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );

    default:
      return todos;
  }
}

const TApp = () => {
  /* const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 기초',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들기',
      checked: false,
    },
  ]); */

  /* const [todos, setTodos] = useState(createBulkTodos); */

  //useReducer사용
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(1501);
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };

    /* // 최적화 'useState의 함수형 업데이트 기능' 사용
    // 상태 업데이트 정의 함수 'setTodos'사용할 때 그 안에 'todos=>'만 앞에 넣어주기.
    setTodos(todos => todos.concat(todo)); */

    dispatch({ type: 'INSERT', todo });

    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  const onRemove = useCallback(id => {
    /* setTodos(todos => todos.filter(todo => todo.id !== id)); */

    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback(id => {
    /*   setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, checked: !todo.checked } : todo))
    ); */

    dispatch({ typd: 'TOGGLE', id });
  }, []);

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <Todolist todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </div>
  );
};

export default TApp;
