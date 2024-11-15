import styled from '@emotion/styled';
import React from 'react';

const TodoWrap = styled.div`
  width: 512px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;
const AppTitleWrap = styled.div`
  background: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrap = styled.div`
  background: white;
`;

const TodoTemplate = ({ children }) => {
  return (
    <TodoWrap>
      <AppTitleWrap>일정관리</AppTitleWrap>
      <ContentWrap>{children}</ContentWrap>
    </TodoWrap>
  );
};

export default TodoTemplate;
