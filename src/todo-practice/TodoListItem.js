import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styled from '@emotion/styled';

const TodoListItemWrap = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background: #d4d4d4;
  }
  & + & {
    border-top: 1px solid #dadada;
  }
`;
const CheckBoxStyle = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
  &.checked {
    svg {
      color: #22b8cf;
    }
  }
`;
const TextStyle = styled.div`
  margin-left: 0.5rem;
  flex: 1;
  &.checked {
    color: #adb5db;
    text-decoration: line-through;
  }
`;
const RemoveStyle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
  &:hover {
    color: #ff8c00;
  }
`;

const TodoListItem = () => {
  return (
    <TodoListItemWrap>
      <CheckBoxStyle>
        <CheckBoxOutlineBlankIcon />
        <TextStyle>할 일</TextStyle>
      </CheckBoxStyle>
      <div>
        <RemoveStyle>
          <RemoveCircleOutlineIcon />
        </RemoveStyle>
      </div>
    </TodoListItemWrap>
  );
};

export default TodoListItem;
