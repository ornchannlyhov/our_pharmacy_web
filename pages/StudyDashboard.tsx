import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { STUDY_DATA, THEME } from '../constants';

export const StudyDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock extended data
  const monthlyData = [
    { name: 'Week 1', hours: 12 },
    { name: 'Week 2', hours: 15 },
    { name: 'Week 3', hours: 8 },
    { name: 'Week 4', hours: 18 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Study Dashboard</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="p-3 bg-green-50 text-[#00B050] rounded-xl"><Clock size={20} /></div>
             <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
           </div>
           <p className="text-gray-500 text-sm">Total Study Time</p>
           <p className="text-2xl font-bold text-gray-900">45h 30m</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={20} /></div>
           </div>
           <p className="text-gray-500 text-sm">Lessons Completed</p>
           <p className="text-2xl font-bold text-gray-900">28</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp size={20} /></div>
           </div>
           <p className="text-gray-500 text-sm">Average Score</p>
           <p className="text-2xl font-bold text-gray-900">85%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Calendar size={20} /></div>
           </div>
           <p className="text-gray-500 text-sm">Current Streak</p>
           <p className="text-2xl font-bold text-gray-900">5 Days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Activity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-w-0">
          <h3 className="font-bold text-gray-900 mb-6">Daily Activity (Hours)</h3>
          {/* Explicit height wrapper */}
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STUDY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="hours" fill="#00B050" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-w-0">
          <h3 className="font-bold text-gray-900 mb-6">Monthly Trend</h3>
          {/* Explicit height wrapper */}
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B050" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00B050" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="hours" stroke="#00B050" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Course Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Course Progress Breakdown</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {['Pharmacology 101', 'Clinical Practice', 'Patient Communication'].map((course, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{course}</h4>
                <p className="text-sm text-gray-500">Last studied: 2 days ago</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{75 - idx * 15}%</p>
                  <p className="text-xs text-gray-400">Complete</p>
                </div>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00B050]" style={{width: `${75 - idx * 15}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};