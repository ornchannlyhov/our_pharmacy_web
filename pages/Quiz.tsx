import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';
import { MOCK_QUIZZES } from '../constants';

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  
  // Mock quiz loading
  const quiz = MOCK_QUIZZES.find(q => q.id === quizId) || MOCK_QUIZZES[0];
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  
  // Removed Timer Logic - Quizzes are self-paced

  const handleAnswer = (optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [quiz.questions[currentQuestionIdx].id]: optionIdx
    }));
  };

  const handleSubmit = () => {
    // Save answers mock logic
    localStorage.setItem(`quiz_result_${quiz.id}`, JSON.stringify(answers));
    navigate(`/courses/${courseId}/quiz/${quizId}/result`);
  };

  const isAnswered = (idx: number) => {
    return answers[quiz.questions[idx].id] !== undefined;
  };

  const currentQuestion = quiz.questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate(`/courses/${courseId}`)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Course
        </button>
        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
          <HelpCircle size={16} />
          Practice Quiz
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestionIdx + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#00B050] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
          {currentQuestion.text}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                answers[currentQuestion.id] === idx 
                  ? 'border-[#00B050] bg-green-50 text-[#00B050]' 
                  : 'border-gray-100 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                answers[currentQuestion.id] === idx
                  ? 'border-[#00B050] bg-[#00B050]'
                  : 'border-gray-300'
              }`}>
                {answers[currentQuestion.id] === idx && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
              </div>
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIdx === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
            currentQuestionIdx === 0 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft size={20} /> Previous
        </button>

        {currentQuestionIdx === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 bg-[#00B050] text-white rounded-xl font-bold hover:bg-[#009945] shadow-lg shadow-green-200 transition-all"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIdx(prev => Math.min(quiz.questions.length - 1, prev + 1))}
            className="flex items-center gap-2 px-8 py-3 bg-[#00B050] text-white rounded-xl font-bold hover:bg-[#009945] shadow-lg shadow-green-200 transition-all"
          >
            Next <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Quick Nav */}
      <div className="mt-12">
        <p className="text-sm font-bold text-gray-500 mb-4">Quick Navigation</p>
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestionIdx(idx)}
              className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                currentQuestionIdx === idx
                  ? 'bg-gray-800 text-white'
                  : isAnswered(idx)
                    ? 'bg-green-100 text-[#00B050]'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};