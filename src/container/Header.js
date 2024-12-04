import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <HeaderWrap>
      {/* <Stack>헤더입니데이.</Stack> */}
      <FirstHeader>
        <UserCheck>
          <IconStyle>엄지</IconStyle>
          <SubCheck>
            <div>사용자 이름</div>
            <ChangeComments>
              아주 훌륭해요! 저축이 많아 안정적으로 재정을 관리하고 있어요.
            </ChangeComments>
          </SubCheck>
        </UserCheck>
      </FirstHeader>

      <SecondHeader>
        <DateStyle>오늘 날짜 표시</DateStyle>
        <AvataStyle>아바타</AvataStyle>
      </SecondHeader>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: pink;
  margin-bottom: 20px;
`;
const FirstHeader = styled.div`
  display: flex;
  background-color: skyblue;
  flex: 1;
`;
const SecondHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: greenyellow;
  flex: 1;
`;

const UserCheck = styled.div`
  display: flex;
  width: 100%;
`;
const ChangeComments = styled.div`
  display: flex;
  background-color: #46a8ff;
`;

const IconStyle = styled.div`
  background: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.5;
  min-height: 50px;
`;
const SubCheck = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
`;
const DateStyle = styled.div`
  display: flex;
  margin-right: 20px;
`;
const AvataStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: tomato;
  border-radius: 50%;
  min-height: 50px;
`;
export default Header;
