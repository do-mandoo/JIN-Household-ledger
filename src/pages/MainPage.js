import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideMenuBar from '../container/SideMenuBar';
import SavingsWrap from '../container/sideBar/SavingsWrap';
import ExpensesWrap from '../container/sideBar/ExpensesWrap';
import MainDashboard from '../container/MainDashboard';
import AnalysisWrap from '../container/sideBar/AnalysisWrap';

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
    minHeight: '100vh',
    backgroundColor: '#110f0f',
  },
  right: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#e8ffb6',
    borderRadius: '0 20px 20px 0',
    // overflowY: 'auto',
  },
};

export default MainPage;
