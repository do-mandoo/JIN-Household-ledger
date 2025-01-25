import React from 'react';
import Header from '../container/Header';
import TopSection from '../container/MainDashboard/TopSection';
import MiddleSection from '../container/MainDashboard/MiddleSection';
import BottomSection from '../container/MainDashboard/BottomSection';

const Dashboard = () => {
  return (
    <>
      <Header />
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </>
  );
};

export default Dashboard;
