import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, PlayCircle, FileText, CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import { MOCK_COURSES, MOCK_CHAPTERS } from '../constants';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['ch1']);

  const course = MOCK_COURSES.find(c => c.id === courseId);
  // In a real app, fetch chapters by courseId
  const chapters = MOCK_CHAPTERS.filter(ch => ch.courseId === 'c1'); // Mocking using c1 for demo

  if (!course) return <div>Course not found</div>;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <button 
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Courses
      </button>

      {/* Banner */}
      <div className="relative h-64 rounded-3xl overflow-hidden shadow-sm">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
          <span className="bg-[#00B050] text-white px-3 py-1 rounded-full text-xs font-bold w-fit mb-3">
            {course.category}
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span>{course.progress}% Complete</span>
            <span>•</span>
            <span>Enrolled: Nov 1, 2025</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Chapters */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
          
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedChapters.includes(chapter.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">{chapter.title}</h3>
                      <p className="text-xs text-gray-500">{chapter.lessons.filter(l => l.isCompleted).length}/{chapter.lessons.length} lessons</p>
                    </div>
                  </div>
                </button>

                {expandedChapters.includes(chapter.id) && (
                  <div className="divide-y divide-gray-100">
                    {chapter.lessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        onClick={() => !lesson.isLocked && navigate(`/courses/${course.id}/lesson/${lesson.id}`)}
                        className={`p-4 flex items-center justify-between transition-colors ${
                          lesson.isLocked ? 'bg-gray-50 opacity-60 cursor-not-allowed' : 'hover:bg-green-50 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${lesson.isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                            {lesson.type === 'video' ? <PlayCircle size={20} /> : <FileText size={20} />}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                            <p className="text-xs text-gray-500">{lesson.duration}</p>
                          </div>
                        </div>
                        
                        <div>
                          {lesson.isCompleted ? (
                            <CheckCircle className="text-green-500" size={20} />
                          ) : lesson.isLocked ? (
                            <Lock className="text-gray-400" size={20} />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#00B050] bg-opacity-10 border border-[#00B050] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Final Course Exam</h3>
              <p className="text-sm text-gray-600">Complete all lessons to unlock the certificate exam.</p>
            </div>
            <button 
              onClick={() => navigate(`/courses/${courseId}/quiz/quiz1`)}
              className="bg-[#00B050] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#009945] transition-colors shadow-lg shadow-green-200"
            >
              Start Exam
            </button>
          </div>
        </div>

        {/* Sidebar: Description */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">About this course</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {course.description}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
               <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Requirements</h4>
               <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                 <li>Basic biology knowledge</li>
                 <li>Medical terminology</li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};