import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SavingsWrap from './SavingsWrap';
import SidebarLogo from '../container/SidebarLogo';
import Dashboard from './Dashboard';
import ExpensesWrap from './ExpensesWrap';
import AnalysisWrap from './AnalysisWrap';
import InvestmentsWrap from './InvestmentsWrap';

const MainPage = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={styles.container}>
          <SidebarLogo />
          <div style={styles.right}>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/expenses' element={<ExpensesWrap />} />
              <Route path='/savings' element={<SavingsWrap />} />
              <Route path='/investments' element={<InvestmentsWrap />} />
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
    // backgroundColor: ' #fff',
    borderRadius: '0 20px 20px 0',
    // overflowY: 'auto',
  },
};

export default MainPage;
