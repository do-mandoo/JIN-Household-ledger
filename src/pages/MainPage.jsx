import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SavingsPage from './SavingsPage';
import SidebarLogo from '../container/SidebarLogo';
import DashboardPage from './DashboardPage';
import ExpensesPage from './ExpensesPage';
import AnalysisPage from './AnalysisPage';
import InvestmentsPage from './InvestmentsPage';

const MainPage = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={styles.container}>
          <SidebarLogo />
          <div style={styles.right}>
            <Routes>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/expenses' element={<ExpensesPage />} />
              <Route path='/savings' element={<SavingsPage />} />
              <Route path='/investments' element={<InvestmentsPage />} />
              <Route path='/analysis' element={<AnalysisPage />} />
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
    // backgroundColor: ' #fff',
    borderRadius: '0 20px 20px 0',
    // overflowY: 'auto',
  },
};

export default MainPage;
