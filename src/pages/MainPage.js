import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideMenuBar from '../container/SideMenuBar';
import SavingsWrap from '../container/SideBar/SavingsWrap';
import ExpensesWrap from '../container/SideBar/ExpensesWrap';
import MainDashboard from '../container/MainDashboard';
import AnalysisWrap from '../container/SideBar/AnalysisWrap';

const MainPage = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={styles.container}>
          <SideMenuBar />
          <div style={styles.right}>
            <Routes>
              <Route path='/' element={<MainDashboard />} />
              <Route path='/expenses' element={<ExpensesWrap />} />
              <Route path='/savings' element={<SavingsWrap />} />
              <Route path='/analysis' element={<AnalysisWrap />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#ffc2c2',
  },
  right: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#e8ffb6',
    borderRadius: '0 20px 20px 0',
  },
};

export default MainPage;
