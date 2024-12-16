import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import MainPage from './pages/MainPage';
import IDBPractice from './practice/idbPractice/IDBPractice';

const theme = createTheme({
  typography: {
    fontFamily: "'Do Hyeon',sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
      {/* <IDBPractice /> */}
    </ThemeProvider>
  );
}

export default App;
