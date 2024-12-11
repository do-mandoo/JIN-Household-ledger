import React from 'react';
import Header from './Header';
import TopSection from './mainDashboard/TopSection';
import MiddleSection from './mainDashboard/MiddleSection';
import BottomSection from './mainDashboard/BottomSection';

const MainDashboard = () => {
  return (
    <>
      <Header />
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </>
  );
};

export default MainDashboard;
