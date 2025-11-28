import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle, Search } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

export const CourseHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'in_progress' | 'completed'>('in_progress');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesTab = activeTab === 'in_progress' ? c.status !== 'completed' : c.status === 'completed';
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Course History</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:border-[#00B050] focus:ring-1 focus:ring-[#00B050] w-64 outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === 'in_progress' ? 'text-[#00B050]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          In Progress
          {activeTab === 'in_progress' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B050]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === 'completed' ? 'text-[#00B050]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Completed
          {activeTab === 'completed' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B050]"></div>
          )}
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            onClick={() => navigate(`/courses/${course.id}`)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                {course.category}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{course.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>{course.progress}% Complete</span>
                  <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00B050] rounded-full transition-all duration-1000"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                
                <div className="pt-2 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-sm">
                      {course.status === 'completed' ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle size={16} /> Completed
                        </span>
                      ) : (
                        <span className="text-blue-600 flex items-center gap-1">
                          <PlayCircle size={16} /> Continue
                        </span>
                      )}
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
             <p>No courses found in {activeTab.replace('_', ' ')}.</p>
          </div>
        )}
      </div>
    </div>
  );
};