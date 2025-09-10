import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { VideoPlayPage } from './components/VideoPlayPage';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recommend" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/play/:videoId/:episode?" element={<VideoPlayPage />} />
            </Routes>
          </ErrorBoundary>
          <Toaster />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;