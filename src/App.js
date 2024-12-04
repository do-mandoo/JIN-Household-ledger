import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import MainPage from './pages/MainPage';

const theme = createTheme({
  typography: {
    fontFamily: "'Do Hyeon',sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
