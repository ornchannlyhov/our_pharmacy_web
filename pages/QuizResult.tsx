import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, RefreshCcw, ArrowRight } from 'lucide-react';
import { MOCK_QUIZZES } from '../constants';

export const QuizResult: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  
  const quiz = MOCK_QUIZZES.find(q => q.id === quizId) || MOCK_QUIZZES[0];
  const userAnswers = JSON.parse(localStorage.getItem(`quiz_result_${quiz.id}`) || '{}');

  let correctCount = 0;
  quiz.questions.forEach(q => {
    if (userAnswers[q.id] === q.correctOptionIndex) correctCount++;
  });

  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const isPassed = score >= 70;

  return (
    <div className="max-w-2xl mx-auto pb-12 pt-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate(`/courses/${courseId}`)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Course
        </button>
      </div>

      <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl text-center mb-8 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-3 ${isPassed ? 'bg-[#00B050]' : 'bg-red-500'}`}></div>
        
        <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-8 shadow-inner ${
          isPassed ? 'bg-green-50 text-[#00B050]' : 'bg-red-50 text-red-500'
        }`}>
          {isPassed ? <CheckCircle size={56} /> : <XCircle size={56} />}
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isPassed ? 'Quiz Passed!' : 'Quiz Failed'}
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          You scored <span className={`font-bold ${isPassed ? 'text-[#00B050]' : 'text-red-500'}`}>{score}%</span>
          <br/>
          ({correctCount} correct out of {quiz.questions.length} questions)
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           {!isPassed && (
             <button 
               onClick={() => navigate(`/courses/${courseId}/quiz/${quizId}`)}
               className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
             >
               <RefreshCcw size={18} /> Retake Quiz
             </button>
           )}
           <button 
             onClick={() => navigate(`/courses/${courseId}`)}
             className="flex items-center gap-2 px-8 py-3 bg-[#00B050] text-white rounded-xl font-bold hover:bg-[#009945] shadow-lg shadow-green-200 transition-all w-full sm:w-auto justify-center"
           >
             Continue <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};