import styled from '@emotion/styled';
import React from 'react';

const BottomSection = () => {
  return (
    <BottomSectionWrap>
      <FirstBox>
        <TitleWrap>
          <div>입출금내역</div>
          <div>지출 추가 입력</div>
        </TitleWrap>
        <div>
          <li>오늘 아이스크림할인점 {`-₩800`}</li>
          <li>어제 아이스크림할인점 {`-₩800`}</li>
          <li>10.20 아이스크림할인점 {`-₩800`}</li>
          <li>10.23 아이스크림할인점 {`-₩800`}</li>
          <li>10.23 아이스크림할인점 {`-₩800`}</li>
        </div>
      </FirstBox>
      <SecondBox>
        <TitleWrap>
          <div>수입</div>
          <div>수입 추가 입력</div>
        </TitleWrap>
        <div>
          <div>
            <li>월급 {`₩2,500,000`}</li>
            <li>이자 {`₩10,000`}</li>
            <li>배당금 {`₩800`}</li>
          </div>
          <div>원형 그래프</div>
        </div>
      </SecondBox>
    </BottomSectionWrap>
  );
};

const BottomSectionWrap = styled.div`
  display: flex;
  min-height: 350px;
  margin-bottom: 10px;
`;

const FirstBox = styled.div`
  background-color: blueviolet;
  display: flex;
  flex-flow: column wrap;
  flex: 1;
  margin-right: 10px;
`;
const TitleWrap = styled.div`
  display: flex;
`;
const SecondBox = styled.div`
  background-color: peru;
  display: flex;
  flex: 1;
  flex-flow: column wrap;
`;

export default BottomSection;
