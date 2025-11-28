import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Clock, CheckCircle, AlertCircle, ArrowRight, Calendar } from 'lucide-react';
import { MOCK_EXAMS } from '../constants';

export const Exams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const navigate = useNavigate();

  const upcomingExams = MOCK_EXAMS.filter(e => e.status === 'upcoming' || e.status === 'overdue');
  const historyExams = MOCK_EXAMS.filter(e => e.status === 'completed');

  const displayedExams = activeTab === 'upcoming' ? upcomingExams : historyExams;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="text-[#00B050]" />
          My Exams
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${
            activeTab === 'upcoming' ? 'text-[#00B050]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upcoming & Overdue
          {upcomingExams.some(e => e.status === 'overdue') && (
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
          )}
          {activeTab === 'upcoming' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B050]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === 'history' ? 'text-[#00B050]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          History
          {activeTab === 'history' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B050]"></div>
          )}
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedExams.map((exam) => (
          <div 
            key={exam.id} 
            className={`bg-white rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md flex flex-col justify-between ${
              exam.status === 'overdue' ? 'border-red-100 bg-red-50/10' : 'border-gray-100'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  exam.status === 'overdue' ? 'bg-red-100 text-red-600' :
                  exam.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {exam.status.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                   <Clock size={14} />
                   {exam.duration} mins
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{exam.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={16} />
                {exam.status === 'completed' ? 'Completed on: ' : 'Due: '} 
                {formatDate(exam.dueDate)}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
               <div className="text-sm text-gray-500">
                 {exam.questionCount} Questions
               </div>
               
               {exam.status === 'completed' ? (
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Score: {exam.score}%</span>
                    <button 
                      onClick={() => navigate(`/exams/${exam.id}/result`)}
                      className="text-[#00B050] text-sm font-bold hover:underline"
                    >
                      View Results
                    </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => navigate(`/exams/${exam.id}/take`)}
                   className={`px-4 py-2 rounded-lg text-sm font-bold text-white flex items-center gap-2 transition-transform active:scale-95 ${
                    exam.status === 'overdue' 
                    ? 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-100' 
                    : 'bg-[#00B050] hover:bg-[#009945] shadow-md shadow-green-100'
                 }`}>
                   Take Exam
                   <ArrowRight size={16} />
                 </button>
               )}
            </div>
          </div>
        ))}

        {displayedExams.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
            <CheckCircle className="mx-auto text-gray-300 mb-3" size={48} />
            <p>No exams found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};