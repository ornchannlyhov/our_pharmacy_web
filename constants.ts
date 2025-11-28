import { Course, LeaderboardEntry, User, Chapter, Exam, Certificate, Quiz, Question } from './types';

export const THEME = {
  colors: {
    primary: '#00B050',
    secondary: '#81C784',
    success: '#37B954',
    danger: '#FF0606',
    warning: '#FF9A0C',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
  }
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'John Doe',
  username: 'johndoe',
  role: 'student',
  department: 'Pharmacy Department',
  points: 0, // Points removed
  avatar: 'https://picsum.photos/200',
  email: 'john.doe@example.com',
  phone: '+1-234-567-8900',
  branch: 'Main Branch',
  position: 'Senior Pharmacist'
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Pharmacology 101',
    category: 'Core Courses',
    description: 'This course covers fundamental concepts in pharmacology including drug classifications, mechanisms of action, and therapeutic uses.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
    status: 'in_progress',
    isAssigned: true,
  },
  {
    id: 'c2',
    title: 'Clinical Practice Guidelines',
    category: 'Electives',
    description: 'Advanced clinical practice guidelines for hospital pharmacists.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    progress: 100,
    totalLessons: 15,
    completedLessons: 15,
    status: 'completed',
    isAssigned: true,
  },
  {
    id: 'c3',
    title: 'Patient Communication',
    category: 'Soft Skills',
    description: 'Effective strategies for communicating with patients and healthcare providers.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    status: 'not_started',
    isAssigned: false,
  },
  {
    id: 'c4',
    title: 'Compounding Basics',
    category: 'Lab Skills',
    description: 'Introduction to sterile and non-sterile compounding.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    progress: 10,
    totalLessons: 12,
    completedLessons: 1,
    status: 'in_progress',
    isAssigned: false,
  }
];

export const MOCK_CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    courseId: 'c1',
    title: 'Introduction to Pharmacology',
    order: 1,
    lessons: [
      { id: 'l1', chapterId: 'ch1', title: 'Overview of Drug Classes', type: 'video', duration: '15 min', isCompleted: true, isLocked: false },
      { id: 'l2', chapterId: 'ch1', title: 'Pharmacokinetics Basics', type: 'video', duration: '20 min', isCompleted: true, isLocked: false },
      { id: 'l3', chapterId: 'ch1', title: 'Pharmacodynamics', type: 'reading', duration: '10 min', isCompleted: false, isLocked: false },
    ]
  },
  {
    id: 'ch2',
    courseId: 'c1',
    title: 'Cardiovascular System',
    order: 2,
    lessons: [
      { id: 'l4', chapterId: 'ch2', title: 'Hypertension Management', type: 'video', duration: '25 min', isCompleted: false, isLocked: true },
      { id: 'l5', chapterId: 'ch2', title: 'Heart Failure Drugs', type: 'video', duration: '30 min', isCompleted: false, isLocked: true },
    ]
  }
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'e1',
    title: 'Pharmacology Mid-Term',
    dueDate: '2025-12-10T23:59:00',
    duration: 60,
    questionCount: 5,
    status: 'overdue'
  },
  {
    id: 'e2',
    title: 'Safety Protocols Final',
    dueDate: '2025-12-15T23:59:00',
    duration: 45,
    questionCount: 5,
    status: 'upcoming'
  },
  {
    id: 'e3',
    title: 'Clinical Practice Basics',
    dueDate: '2025-11-20T23:59:00',
    duration: 90,
    questionCount: 5,
    status: 'completed',
    score: 85
  }
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert1',
    courseName: 'Clinical Practice Guidelines',
    issueDate: 'Nov 20, 2025',
    imageUrl: 'https://picsum.photos/400/300?random=10'
  }
];

// Enhanced Leaderboard Entry interface for internal use in constants
interface EnhancedLeaderboardEntry extends LeaderboardEntry {
  stats: {
    examScore: number;
    studyHours: number;
    coursesCompleted: number;
  }
}

export const MOCK_LEADERBOARD: EnhancedLeaderboardEntry[] = [
  { 
    rank: 1, 
    user: { name: 'Alice Wong', department: 'Pharmacy Dept.', avatar: 'https://i.pravatar.cc/150?u=alice' }, 
    points: 0,
    isCurrentUser: false,
    stats: { examScore: 98, studyHours: 45, coursesCompleted: 12 }
  },
  { 
    rank: 2, 
    user: { name: 'Bob Chen', department: 'Clinical Practice', avatar: 'https://i.pravatar.cc/150?u=bob' }, 
    points: 0,
    isCurrentUser: false,
    stats: { examScore: 95, studyHours: 42, coursesCompleted: 11 }
  },
  { 
    rank: 3, 
    user: { name: 'Carol Lee', department: 'Research Dept.', avatar: 'https://i.pravatar.cc/150?u=carol' }, 
    points: 0,
    isCurrentUser: false,
    stats: { examScore: 92, studyHours: 40, coursesCompleted: 10 }
  },
  { 
    rank: 4, 
    user: { name: 'David Kim', department: 'Outpatient', avatar: 'https://i.pravatar.cc/150?u=david' }, 
    points: 0,
    isCurrentUser: false,
    stats: { examScore: 88, studyHours: 35, coursesCompleted: 8 }
  },
  { 
    rank: 5, 
    user: { name: 'John Doe', department: 'Pharmacy Department', avatar: 'https://picsum.photos/200' }, 
    points: 0,
    isCurrentUser: true,
    stats: { examScore: 85, studyHours: 28, coursesCompleted: 5 }
  },
  { 
    rank: 6, 
    user: { name: 'Sarah Smith', department: 'Inpatient', avatar: 'https://i.pravatar.cc/150?u=sarah' }, 
    points: 0,
    isCurrentUser: false,
    stats: { examScore: 82, studyHours: 25, coursesCompleted: 4 }
  },
  { 
    rank: 7, 
    user: { name: 'Mike Johnson', department: 'Logistics', avatar: 'https://i.pravatar.cc/150?u=mike' }, 
    points: 0,
    isCurrentUser: false,
    stats: { examScore: 78, studyHours: 20, coursesCompleted: 3 }
  },
];

export const STUDY_DATA = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.0 },
  { day: 'Wed', hours: 4.2 },
  { day: 'Thu', hours: 3.5 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 1.5 },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What is the primary function of the liver in drug metabolism?',
    options: ['Storage of drugs', 'Breakdown of drugs', 'Production of drugs', 'None of the above'],
    correctOptionIndex: 1
  },
  {
    id: 'q2',
    text: 'Which of the following is NOT a route of drug administration?',
    options: ['Oral', 'Intravenous', 'Telepathic', 'Subcutaneous'],
    correctOptionIndex: 2
  },
  {
    id: 'q3',
    text: 'What does FDA stand for?',
    options: ['Federal Drug Association', 'Food and Drug Administration', 'Free Drug Access', 'Formal Drug Assessment'],
    correctOptionIndex: 1
  },
  {
    id: 'q4',
    text: 'Which drug class is typically used to treat high blood pressure?',
    options: ['Antibiotics', 'ACE Inhibitors', 'Antihistamines', 'Analgesics'],
    correctOptionIndex: 1
  },
  {
    id: 'q5',
    text: 'Paracetamol is primarily used as an:',
    options: ['Anti-inflammatory', 'Antipyretic and Analgesic', 'Antibiotic', 'Antiviral'],
    correctOptionIndex: 1
  }
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'quiz1',
    title: 'Chapter 1 Quiz',
    questions: MOCK_QUESTIONS,
    timeLimit: 15
  }
];