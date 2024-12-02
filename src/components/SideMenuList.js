import { List, ListItem } from '@mui/material';
import React from 'react';
import SideMenuListItem from './SideMenuListItem';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import flexCenter from '../assets/flexCenter';
const SideMenuList = () => {
  const menuList = [
    {
      id: 1,
      firstText: '대시보드',
      secondText: 'Dashboard',
      link: '/',
      icon: <DashboardOutlinedIcon sx={{ color: 'white' }} />,
    },
    {
      id: 2,
      firstText: '지출',
      secondText: 'Expenses',
      link: '/expenses',
      icon: <PaidOutlinedIcon sx={{ color: 'white' }} />,
    },
    {
      id: 3,
      firstText: '수입',
      secondText: 'Savings',
      link: '/savings',
      icon: <SavingsOutlinedIcon sx={{ color: 'white' }} />,
    },
    {
      id: 4,
      firstText: '분석',
      secondText: 'Analysis',
      link: '/analysis',
      icon: <AnalyticsOutlinedIcon sx={{ color: 'white' }} />,
    },
  ];

  return (
    <List sx={{ ...flexCenter }}>
      {menuList.map(list => (
        <SideMenuListItem key={list.id} list={list} />
      ))}
    </List>
  );
};

export default SideMenuList;
