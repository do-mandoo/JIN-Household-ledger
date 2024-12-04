import React from 'react';
import Header from './Header';
import TopSection from './MainDashboard/TopSection';
import MiddleSection from './MainDashboard/MiddleSection';
import BottomSection from './MainDashboard/BottomSection';

const MainDashboard = () => {
  return (
    <div>
      <Header />
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </div>
  );
};

export default MainDashboard;
