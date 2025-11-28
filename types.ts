export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role: 'student' | 'admin';
  department?: string;
  points: number;
  email?: string;
  phone?: string;
  branch?: string;
  position?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
  status: 'not_started' | 'in_progress' | 'completed';
  isAssigned: boolean;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  type: 'video' | 'reading' | 'pdf';
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit?: number; // in minutes
}

export interface Exam {
  id: string;
  title: string;
  courseId?: string;
  dueDate: string;
  duration: number; // minutes
  questionCount: number;
  status: 'upcoming' | 'overdue' | 'completed';
  score?: number;
}

export interface Certificate {
  id: string;
  courseName: string;
  issueDate: string;
  imageUrl: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar?: string;
    department: string;
  };
  points: number;
  isCurrentUser: boolean;
}