import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { SearchPage } from './components/pages/SearchPage';
import { VideoPlayPage } from './components/pages/VideoPlayPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlassEffectProvider } from './contexts/GlassEffectContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GlassEffectProvider>
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
        </GlassEffectProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;