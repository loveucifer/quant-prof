import React from 'react';
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
import ArithmeticProGamePage from './pages/ArithmeticProGamePage';
import SequenceGamePage from './pages/SequenceGamePage';
import LoginPage from './pages/LoginPage';
import CourseSalesPage from './pages/CourseSalesPage'; // Import the new sales page
import CoursePlayerPage from './pages/CoursePlayerPage';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          
          {/* FIX: Route to the sales page for course details */}
          <Route path="/course/:courseId" element={<CourseSalesPage />} />
          
          {/* FIX: Dedicated routes for the course player */}
          <Route path="/learn/:courseId" element={<CoursePlayerPage />} />
          <Route path="/learn/:courseId/:lessonId" element={<CoursePlayerPage />} />

          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problem/:id" element={<ProblemDetailPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/arithmetic" element={<ArithmeticGamePage />} />
          <Route path="/games/arithmetic-pro" element={<ArithmeticProGamePage />} />
          <Route path="/games/sequence" element={<SequenceGamePage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
