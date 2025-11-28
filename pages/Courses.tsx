import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

export const Courses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assigned' | 'public'>('assigned');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse query params to handle search from home screen
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchTerm(decodeURIComponent(query));
      setActiveTab('public'); // Switch to public to search everything
    } else {
      setSearchTerm('');
    }
  }, [location.search]);

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesTab = activeTab === 'assigned' ? c.isAssigned : !c.isAssigned;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    // If searching, we might want to ignore tabs or just show results, but adhering to tabs for now. 
    // Optimization: if search term exists, maybe search across both? 
    // For now, let's keep tab logic but if searching, search within tab.
    return matchesTab && matchesSearch;
  });

  // Alternative: If searching, search ALL courses regardless of tab, but display badge?
  // Let's stick to tab logic for simplicity but ensure UI reflects it.
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Update URL to keep in sync or just local state? Local state is smoother for typing.
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search within tab..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:border-[#00B050] focus:ring-1 focus:ring-[#00B050] w-64 outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('assigned')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === 'assigned' ? 'text-[#00B050]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Assigned Courses
          {activeTab === 'assigned' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B050]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('public')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === 'public' ? 'text-[#00B050]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Public Courses
          {activeTab === 'public' && (
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
                          <PlayCircle size={16} /> In Progress
                        </span>
                      )}
                   </div>
                   {activeTab === 'public' && !course.isAssigned && (
                     <button className="text-[#00B050] text-sm font-bold hover:underline">
                       Enroll Now
                     </button>
                   )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
             <p>No courses found matching "{searchTerm}" in {activeTab} courses.</p>
             {searchTerm && (
               <button onClick={() => setActiveTab(activeTab === 'assigned' ? 'public' : 'assigned')} className="text-[#00B050] font-bold mt-2 hover:underline">
                 Check {activeTab === 'assigned' ? 'Public' : 'Assigned'} courses?
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
};