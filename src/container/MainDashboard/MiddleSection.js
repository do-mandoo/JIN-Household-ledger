import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const MiddleSection = () => {
  return (
    <MiddleWrap>
      <TitleWrap>
        <TitleStyle>지출</TitleStyle>
        <Link to='/expenses'>
          <ButtonStyle>지출 모두 보기 &gt; </ButtonStyle>
        </Link>
      </TitleWrap>
      <ListWrap>
        <ListItemWrap>1</ListItemWrap>
        <ListItemWrap>2</ListItemWrap>
        <ListItemWrap>3</ListItemWrap>
        <ListItemWrap>4</ListItemWrap>
        <ListItemWrap>5</ListItemWrap>
      </ListWrap>
    </MiddleWrap>
  );
};

const MiddleWrap = styled.div`
  background-color: aqua;
  margin-bottom: 20px;
`;
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleStyle = styled.h3`
  font-size: 30px;
  margin: 0;
  font-weight: 100;
`;
const ListWrap = styled.div`
  background-color: yellow;
  display: flex;
`;
const ButtonStyle = styled.div`
  background-color: #90ff65;
  border: none;
  display: flex;
  /* flex-direction: row-reverse; */
  &:hover {
    cursor: pointer;
  }
`;

const ListItemWrap = styled.li`
  background-color: pink;
  /* display: flex; */
  flex: 1;
  margin: 5px;
  list-style: none;
  min-height: 150px;
`;

export default MiddleSection;
