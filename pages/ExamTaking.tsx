import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, AlertTriangle, ChevronRight, ChevronLeft, Flag, Menu, X, ShieldCheck } from 'lucide-react';
import { MOCK_EXAMS, MOCK_QUESTIONS } from '../constants';

export const ExamTaking: React.FC = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  
  // Mock exam structure based on questions
  const exam = MOCK_EXAMS.find(e => e.id === examId) || MOCK_EXAMS[0];
  const questions = MOCK_QUESTIONS; // In real app, exam would have specific questions
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIdx].id]: optionIdx
    }));
  };

  const toggleFlag = () => {
    const qId = questions[currentQuestionIdx].id;
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSubmit = () => {
    localStorage.setItem(`exam_result_${exam.id}`, JSON.stringify(answers));
    navigate(`/exams/${examId}/result`);
  };

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Bar - Differentiated for Exam Mode */}
      <div className="bg-slate-900 text-white h-16 flex items-center justify-between px-4 lg:px-8 fixed top-0 left-0 right-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#00B050]" size={24} />
          <div>
            <h1 className="font-bold truncate max-w-[150px] md:max-w-md text-sm md:text-base leading-tight">{exam.title}</h1>
            <p className="text-xs text-slate-400">Exam Mode • Do not close window</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 font-mono font-bold text-xl px-4 py-1.5 rounded bg-slate-800 border border-slate-700 ${timeLeft < 300 ? 'text-red-400 animate-pulse border-red-900' : 'text-white'}`}>
            <Clock size={18} />
            {formatTime(timeLeft)}
          </div>
          <button 
            className="lg:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-lg"
            onClick={() => setIsNavOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 pt-16 h-screen">
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-slate-50">
          <div className="max-w-3xl mx-auto mt-4">
            
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
               <div className="flex items-center gap-2">
                 <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">
                   Q{currentQuestionIdx + 1}
                 </div>
                 <span className="text-slate-500 text-sm font-medium">of {questions.length} Questions</span>
               </div>
               <button 
                 onClick={toggleFlag}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                   flagged.has(currentQuestion.id) 
                     ? 'bg-orange-100 text-orange-600 border border-orange-200' 
                     : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                 }`}
               >
                 <Flag size={16} fill={flagged.has(currentQuestion.id) ? "currentColor" : "none"} />
                 {flagged.has(currentQuestion.id) ? 'Flagged' : 'Flag'}
               </button>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed">
                {currentQuestion.text}
              </h2>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                      answers[currentQuestion.id] === idx 
                        ? 'border-[#00B050] bg-green-50/50 text-slate-900' 
                        : 'border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      answers[currentQuestion.id] === idx
                        ? 'border-[#00B050] bg-[#00B050]'
                        : 'border-slate-300 group-hover:border-slate-400'
                    }`}>
                      {answers[currentQuestion.id] === idx && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-medium text-lg">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pb-8">
              <button
                onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIdx === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
                  currentQuestionIdx === 0 
                    ? 'text-slate-300 cursor-not-allowed' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <ChevronLeft size={20} /> Previous
              </button>

              {currentQuestionIdx === questions.length - 1 ? (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black shadow-lg shadow-slate-300 transition-all"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-2 px-8 py-3 bg-[#00B050] text-white rounded-xl font-bold hover:bg-[#009945] shadow-lg shadow-green-200 transition-all"
                >
                  Next <ChevronRight size={20} />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Sidebar Nav (Desktop) */}
        <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:border-l lg:border-slate-200 z-50 ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900">Question Map</h3>
              <button onClick={() => setIsNavOpen(false)} className="lg:hidden p-2 text-slate-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 bg-white">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentQuestionIdx(idx);
                      setIsNavOpen(false);
                    }}
                    className={`aspect-square rounded-lg text-sm font-bold flex items-center justify-center relative transition-all border-2 ${
                      currentQuestionIdx === idx
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : answers[q.id] !== undefined
                          ? 'border-[#00B050]/30 bg-green-50 text-[#00B050]'
                          : 'border-transparent bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                    {flagged.has(q.id) && (
                      <div className="absolute -top-1 -right-1">
                         <div className="bg-orange-500 w-3 h-3 rounded-full border border-white"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-3 p-4 bg-slate-50 rounded-xl">
                 <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                   <div className="w-4 h-4 rounded bg-slate-900"></div> Current
                 </div>
                 <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                   <div className="w-4 h-4 rounded bg-green-50 border border-[#00B050]/30"></div> Answered
                 </div>
                 <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                   <div className="w-4 h-4 rounded bg-slate-200"></div> Unanswered
                 </div>
                 <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                   <div className="w-4 h-4 rounded-full bg-orange-500"></div> Flagged
                 </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={() => setShowSubmitConfirm(true)}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black shadow-lg transition-all"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Submit Modal */}
       {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Exam?</h3>
            <p className="text-slate-500 mb-6 text-sm">
              You have answered {Object.keys(answers).length} of {questions.length} questions.
              {flagged.size > 0 && ` You have ${flagged.size} flagged questions.`}
              <br/>Once submitted, you cannot change your answers.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSubmit}
                className="w-full py-3 bg-[#00B050] text-white rounded-xl font-bold hover:bg-[#009945] transition-colors shadow-lg shadow-green-100"
              >
                Yes, Submit Exam
              </button>
              <button 
                onClick={() => setShowSubmitConfirm(false)}
                className="w-full py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
              >
                Review Answers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};