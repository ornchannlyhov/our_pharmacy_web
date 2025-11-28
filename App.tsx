import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Lesson } from './pages/Lesson';
import { Leaderboard } from './pages/Leaderboard';
import { Exams } from './pages/Exams';
import { Profile } from './pages/Profile';
import { Quiz } from './pages/Quiz';
import { QuizResult } from './pages/QuizResult';
import { ExamTaking } from './pages/ExamTaking';
import { ExamResult } from './pages/ExamResult';
import { StudyDashboard } from './pages/StudyDashboard';
import { CertificateViewer } from './pages/CertificateViewer';
import { CourseHistory } from './pages/CourseHistory';
import { Certificates } from './pages/Certificates';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, check authentication here
  const isAuthenticated = true; 
  if (!isAuthenticated) return <Navigate to="/" />;
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />

        <Route path="/history" element={
          <ProtectedRoute>
            <CourseHistory />
          </ProtectedRoute>
        } />

        <Route path="/courses/:courseId" element={
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        } />

        <Route path="/courses/:courseId/lesson/:lessonId" element={
          <ProtectedRoute>
            <Lesson />
          </ProtectedRoute>
        } />

        {/* Quiz Routes */}
        <Route path="/courses/:courseId/quiz/:quizId" element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } />
        <Route path="/courses/:courseId/quiz/:quizId/result" element={
          <ProtectedRoute>
            <QuizResult />
          </ProtectedRoute>
        } />
        
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        } />
        
        <Route path="/exams" element={
          <ProtectedRoute>
            <Exams />
          </ProtectedRoute>
        } />

        {/* Exam Routes */}
        <Route path="/exams/:examId/take" element={
          // Exam has its own layout/header, so we might skip Layout wrapper or handle it inside
          <ExamTaking />
        } />
        <Route path="/exams/:examId/result" element={
          <ProtectedRoute>
            <ExamResult />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/certificates" element={
          <ProtectedRoute>
            <Certificates />
          </ProtectedRoute>
        } />

        <Route path="/profile/study-dashboard" element={
          <ProtectedRoute>
            <StudyDashboard />
          </ProtectedRoute>
        } />

        <Route path="/profile/certificates/:certificateId" element={
          <CertificateViewer />
        } />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;