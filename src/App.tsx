import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { VideoPlayPage } from './components/VideoPlayPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommend" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<HomePage />} />
        <Route path="/play/:videoId/:episode?" element={<VideoPlayPage />} />
      </Routes>
    </Router>
  );
}

export default App;