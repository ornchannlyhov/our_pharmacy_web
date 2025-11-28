import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Calendar, ChevronDown, Trophy, ArrowLeft, Lightbulb, ChevronUp } from 'lucide-react';
import { MOCK_EXAMS, MOCK_QUESTIONS } from '../constants';

export const ExamResult: React.FC = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [showBreakdown, setShowBreakdown] = useState(true);
  
  const exam = MOCK_EXAMS.find(e => e.id === examId) || MOCK_EXAMS[0];
  const questions = MOCK_QUESTIONS; 
  // Ensure we get valid answers or default to empty
  const userAnswers = JSON.parse(localStorage.getItem(`exam_result_${exam.id}`) || '{}');

  let correctCount = 0;
  questions.forEach(q => {
    // Check if the key exists and matches
    if (userAnswers[q.id] !== undefined && userAnswers[q.id] === q.correctOptionIndex) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / questions.length) * 100);
  const isPassed = score >= 70; // Set pass mark

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <button 
        onClick={() => navigate('/exams')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Exams
      </button>

      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-full h-2 ${isPassed ? 'bg-[#00B050]' : 'bg-red-500'}`}></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-4 ${
              isPassed ? 'bg-green-50 text-[#00B050]' : 'bg-red-50 text-red-500'
            }`}>
              {isPassed ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {isPassed ? 'PASSED' : 'FAILED'}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{exam.title}</h1>
            <p className="text-gray-500">Attempt 1 of 3 • Completed Just Now</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Score</p>
              <p className={`text-4xl font-bold ${isPassed ? 'text-[#00B050]' : 'text-red-500'}`}>{score}%</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Correct</p>
              <p className="text-4xl font-bold text-gray-900">{correctCount}<span className="text-xl text-gray-400">/{questions.length}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Clock size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Time Taken</p>
            <p className="font-bold text-gray-900">45m 20s</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Calendar size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Trophy size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Percentile</p>
            <p className="font-bold text-gray-900">Top 15%</p>
          </div>
        </div>
      </div>

      {/* Certificate Callout */}
      {isPassed && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h3>
            <p className="text-gray-600">You have successfully passed the exam and earned a certificate.</p>
          </div>
          <button 
             onClick={() => navigate('/profile/certificates/new')}
             className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-black transition-colors"
          >
            View Certificate
          </button>
        </div>
      )}

      {/* Question Review */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button 
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-bold text-gray-900">Detailed Breakdown</span>
          {showBreakdown ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </button>
        
        {showBreakdown && (
          <div className="p-6 border-t border-gray-100 space-y-6">
            {questions.map((q, idx) => {
              const userAnswer = userAnswers[q.id];
              const isCorrect = userAnswer === q.correctOptionIndex;
              const hasAnswered = userAnswer !== undefined;

              return (
                <div key={q.id} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4 mb-4">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                       <h3 className="font-bold text-gray-900">{q.text}</h3>
                    </div>
                    {isCorrect ? <CheckCircle className="text-[#00B050]" /> : <XCircle className="text-red-500" />}
                  </div>

                  <div className="space-y-2 pl-12">
                    <div className="p-3 bg-gray-50 rounded-lg text-sm flex items-center justify-between">
                      <span className="text-gray-500">Your Answer:</span>
                      <span className={`font-medium ${isCorrect ? 'text-[#00B050]' : 'text-red-500'}`}>
                        {hasAnswered ? q.options[userAnswer] : 'Skipped'}
                      </span>
                    </div>
                    
                    {!isCorrect && (
                       <div className="p-3 bg-green-50 rounded-lg text-sm flex items-center justify-between">
                         <span className="text-gray-500">Correct Answer:</span>
                         <span className="font-bold text-[#00B050]">{q.options[q.correctOptionIndex]}</span>
                       </div>
                    )}

                    {!isCorrect && (
                      <div className="mt-3 flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <Lightbulb size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <p>Explanation text would go here to help you understand why {q.options[q.correctOptionIndex]} is the correct answer.</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};