import React, { useState } from 'react';
import { Search, Trophy, Medal, Filter, Check } from 'lucide-react';
import { MOCK_LEADERBOARD } from '../constants';

type FilterType = 'Exam Score' | 'Study Hours' | 'Courses Completed';

export const Leaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('Exam Score');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters: FilterType[] = ['Exam Score', 'Study Hours', 'Courses Completed'];

  // Filter and sort the leaderboard
  const processedLeaderboard = [...MOCK_LEADERBOARD]
    .filter(entry => entry.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      // Access the mock stats directly
      const aStats = (a as any).stats || { examScore: 0, studyHours: 0, coursesCompleted: 0 };
      const bStats = (b as any).stats || { examScore: 0, studyHours: 0, coursesCompleted: 0 };

      switch (activeFilter) {
        case 'Exam Score':
          return bStats.examScore - aStats.examScore;
        case 'Study Hours':
          return bStats.studyHours - aStats.studyHours;
        case 'Courses Completed':
          return bStats.coursesCompleted - aStats.coursesCompleted;
        default:
          return bStats.examScore - aStats.examScore;
      }
    });

  // Re-assign ranks based on new sort
  const rankedLeaderboard = processedLeaderboard.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));

  const topThree = rankedLeaderboard.slice(0, 3);
  const rest = rankedLeaderboard.slice(3);

  const getDisplayValue = (entry: any) => {
    const stats = entry.stats || { examScore: 0, studyHours: 0, coursesCompleted: 0 };
    switch (activeFilter) {
      case 'Exam Score': return `${stats.examScore}%`;
      case 'Study Hours': return `${stats.studyHours}h`;
      case 'Courses Completed': return `${stats.coursesCompleted}`;
      default: return `${stats.examScore}%`;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-20">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="text-[#00B050]" />
            Leaderboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ranking based on: <span className="font-bold text-[#00B050]">{activeFilter}</span>
          </p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:border-[#00B050] focus:ring-1 focus:ring-[#00B050] w-64 outline-none shadow-sm"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-2 rounded-full transition-colors flex items-center gap-2 px-4 border ${
                isFilterOpen ? 'bg-green-50 border-[#00B050] text-[#00B050]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#00B050]'
              }`}
            >
              <Filter size={18} />
              <span className="hidden sm:inline text-sm font-medium">Filter</span>
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2">
                  <div className="px-4 py-2 border-b border-gray-50 font-bold text-xs text-gray-400 uppercase">
                    Rank By
                  </div>
                  {filters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setIsFilterOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between text-gray-700"
                    >
                      {filter}
                      {activeFilter === filter && <Check size={16} className="text-[#00B050]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {rankedLeaderboard.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">No users found.</p>
        </div>
      ) : (
        <>
          {/* Podium - Top 3 */}
          {topThree.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-center mb-12 mt-24">
               {/* 2nd Place */}
               {topThree[1] && (
                 <div className="order-2 md:order-1 flex flex-col items-center">
                   <div className="relative mb-4">
                     <img 
                       src={topThree[1].user.avatar || "https://via.placeholder.com/150"} 
                       alt={topThree[1].user.name} 
                       className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-lg object-cover"
                     />
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-white">
                       2
                     </div>
                   </div>
                   <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full text-center">
                     <h3 className="font-bold text-gray-900">{topThree[1].user.name}</h3>
                     <p className="text-xs text-gray-500 mb-2">{topThree[1].user.department}</p>
                     <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                       {getDisplayValue(topThree[1])}
                     </span>
                   </div>
                 </div>
               )}

               {/* 1st Place */}
               {topThree[0] && (
                 <div className="order-1 md:order-2 flex flex-col items-center -mt-8">
                   <div className="relative mb-4">
                     <img 
                       src={topThree[0].user.avatar || "https://via.placeholder.com/150"} 
                       alt={topThree[0].user.name} 
                       className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-xl object-cover"
                     />
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white">
                       1
                     </div>
                   </div>
                   <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-xl shadow-md border border-yellow-100 w-full text-center relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                     <h3 className="font-bold text-lg text-gray-900">{topThree[0].user.name}</h3>
                     <p className="text-sm text-gray-500 mb-3">{topThree[0].user.department}</p>
                     <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-base font-bold">
                       {getDisplayValue(topThree[0])}
                     </span>
                   </div>
                 </div>
               )}

               {/* 3rd Place */}
               {topThree[2] && (
                 <div className="order-3 flex flex-col items-center">
                   <div className="relative mb-4">
                     <img 
                       src={topThree[2].user.avatar || "https://via.placeholder.com/150"} 
                       alt={topThree[2].user.name} 
                       className="w-20 h-20 rounded-full border-4 border-orange-300 shadow-lg object-cover"
                     />
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-300 text-orange-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-white">
                       3
                     </div>
                   </div>
                   <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full text-center">
                     <h3 className="font-bold text-gray-900">{topThree[2].user.name}</h3>
                     <p className="text-xs text-gray-500 mb-2">{topThree[2].user.department}</p>
                     <span className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                       {getDisplayValue(topThree[2])}
                     </span>
                   </div>
                 </div>
               )}
            </div>
          )}

          {/* List View for the rest */}
          {rest.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
              {rest.map((entry) => (
                <div 
                  key={entry.rank} 
                  className={`flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${entry.isCurrentUser ? 'bg-green-50 hover:bg-green-100' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center font-bold text-gray-400 text-sm">#{entry.rank}</span>
                    <img 
                      src={entry.user.avatar || "https://via.placeholder.com/40"} 
                      alt={entry.user.name} 
                      className="w-10 h-10 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <p className={`font-bold text-sm ${entry.isCurrentUser ? 'text-[#00B050]' : 'text-gray-900'}`}>
                        {entry.user.name} {entry.isCurrentUser && '(You)'}
                      </p>
                      <p className="text-xs text-gray-400">{entry.user.department}</p>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 text-sm">
                    {getDisplayValue(entry)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};