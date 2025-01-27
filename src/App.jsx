import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import MainPage from './pages/MainPage';

const theme = createTheme({
  typography: {
    fontFamily: "'IBM Plex Sans KR', serif",
    color: '#fff',
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
