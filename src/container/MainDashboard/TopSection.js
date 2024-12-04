import styled from '@emotion/styled';
import React from 'react';

const TopSection = () => {
  return (
    <TopSectionWrap>
      <FirstBox>1번 박스</FirstBox>
      <SecondBox>2번 박스</SecondBox>
    </TopSectionWrap>
  );
};

const TopSectionWrap = styled.div`
  display: flex;
  min-height: 350px;
  margin-bottom: 20px;
`;

const FirstBox = styled.div`
  background-color: peru;
  display: flex;
  flex: 1;
  margin-right: 10px;
`;
const SecondBox = styled.div`
  background-color: blueviolet;
  display: flex;
  flex: 1;
`;

export default TopSection;
