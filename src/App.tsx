import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { VideoPlayPage } from './components/VideoPlayPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommend" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<HomePage />} />
          <Route path="/play/:videoId/:episode?" element={<VideoPlayPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;