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
`;
const CheckedTextStyle = styled.div`
  margin-left: 0.5rem;
  flex: 1;
  color: #adb5db;
  text-decoration: line-through;
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

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <TodoListItemWrap>
      <CheckBoxStyle onClick={() => onToggle(id)}>
        {checked !== true ? (
          <>
            <CheckBoxOutlineBlankIcon />
            <TextStyle>{text}</TextStyle>
          </>
        ) : (
          <>
            <CheckBoxIcon />
            <CheckedTextStyle>{text}</CheckedTextStyle>
          </>
        )}
        {/* {checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        <TextStyle>{text}</TextStyle> */}
      </CheckBoxStyle>
      <div>
        <RemoveStyle onClick={() => onRemove(id)}>
          <RemoveCircleOutlineIcon />
        </RemoveStyle>
      </div>
    </TodoListItemWrap>
  );
};

export default React.memo(TodoListItem);
