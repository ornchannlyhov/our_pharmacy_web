import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, Award, BookOpen, AlertCircle, BarChart2, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import { MOCK_USER, MOCK_LEADERBOARD, STUDY_DATA } from '../constants';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {MOCK_USER.name}! Here's your daily overview.</p>
        </div>
        <button 
          onClick={() => navigate('/courses')}
          className="bg-[#00B050] text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-green-200 hover:bg-[#009945] transition-all flex items-center gap-2 w-fit"
        >
          <BookOpen size={18} />
          Continue Learning
        </button>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-xs text-gray-500 font-medium uppercase">Courses Active</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-[#00B050] rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-500 font-medium uppercase">Lessons Done</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">12.5h</p>
            <p className="text-xs text-gray-500 font-medium uppercase">Study Time</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Award size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">1</p>
            <p className="text-xs text-gray-500 font-medium uppercase">Certificate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Study Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BarChart2 className="text-[#00B050]" size={20} />
                  Weekly Activity
                </h2>
              </div>
              <button 
                onClick={() => navigate('/profile/study-dashboard')}
                className="text-xs bg-green-50 text-[#00B050] px-3 py-1.5 rounded-lg font-bold hover:bg-green-100 transition-colors"
              >
                View Details
              </button>
            </div>
            
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STUDY_DATA}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 6, 6]} barSize={30}>
                    {STUDY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.hours > 3 ? '#00B050' : '#81C784'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-gray-400" size={20} />
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">Completed Lesson: Overview of Drug Classes</p>
                  <p className="text-xs text-gray-500">Pharmacology 101 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">Started Course: Clinical Practice</p>
                  <p className="text-xs text-gray-500">Electives • Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <Award size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">Earned Certificate</p>
                  <p className="text-xs text-gray-500">Safety Protocols • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* Due Exams Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              Exams Due
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 text-sm">Pharmacology Mid-Term</h3>
                <p className="text-xs text-red-500 font-medium mt-1 mb-3">Due: Tomorrow, 11:59 PM</p>
                <button 
                  onClick={() => navigate('/exams/e1/take')}
                  className="w-full bg-white border border-red-200 text-red-500 py-2 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-colors"
                >
                  Take Exam
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 text-sm">Safety Protocols Quiz</h3>
                <p className="text-xs text-gray-500 font-medium mt-1 mb-3 flex items-center gap-1">
                  <Calendar size={12} /> Dec 15, 2025
                </p>
                <button 
                  onClick={() => navigate('/exams/e2/take')}
                  className="w-full bg-white border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Start
                </button>
              </div>
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Award className="text-yellow-500" size={20} />
                Leaderboard
              </h2>
              <button 
                onClick={() => navigate('/leaderboard')}
                className="text-sm text-[#00B050] font-medium hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {MOCK_LEADERBOARD.slice(0, 3).map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs
                      ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : ''}
                      ${idx === 1 ? 'bg-gray-200 text-gray-600' : ''}
                      ${idx === 2 ? 'bg-orange-100 text-orange-600' : ''}
                    `}>
                      {entry.rank}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{entry.user.name}</p>
                      <p className="text-[10px] text-gray-400">{entry.user.department}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#00B050] text-sm">{entry.stats.examScore}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};