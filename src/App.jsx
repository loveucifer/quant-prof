import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import ProblemsPage from './pages/ProblemsPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import CoursesPage from './pages/CoursesPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import ArithmeticGamePage from './pages/ArithmeticGamePage';
import ArithmeticProGamePage from './pages/ArithmeticProGamePage'; // 1. Import Pro game
import SequenceGamePage from './pages/SequenceGamePage'; // 2. Import Sequence game

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problem/:id" element={<ProblemDetailPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/arithmetic" element={<ArithmeticGamePage />} />
          <Route path="/games/arithmetic-pro" element={<ArithmeticProGamePage />} /> {/* 3. Add Pro route */}
          <Route path="/games/sequence" element={<SequenceGamePage />} /> {/* 4. Add Sequence route */}
          <Route path="/blog/:id" element={<BlogPostPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
