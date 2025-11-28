import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, FileText, Download, Play, Pause, Volume2, Maximize, X, Eye } from 'lucide-react';

export const Lesson: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState('');

  const handleDownload = (fileName: string) => {
    // Simulate download for real files
    alert(`Downloading ${fileName}...`);
  };

  const openPdfViewer = (fileName: string) => {
    setCurrentPdf(fileName);
    setPdfViewerOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header Navigation */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(`/courses/${courseId}`)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00B050] transition-colors mb-2"
        >
          <ArrowLeft size={16} />
          Back to Course
        </button>
        <h1 className="text-2xl font-bold text-gray-900">1. Overview of Drug Classes</h1>
        <p className="text-sm text-gray-500">Chapter 1: Introduction to Pharmacology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Player Mockup */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative shadow-lg group">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 bg-[#00B050] rounded-full flex items-center justify-center text-white pl-1 hover:scale-110 transition-transform shadow-xl shadow-green-900/50"
                >
                  <Play size={32} fill="currentColor" />
                </button>
              </div>
            ) : null}
            
            <img 
              src="https://picsum.photos/800/450" 
              alt="Video Thumbnail" 
              className={`w-full h-full object-cover transition-opacity ${isPlaying ? 'opacity-50' : 'opacity-80'}`} 
            />

            {/* Controls Mockup */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-1 bg-gray-600 rounded-full mb-4 cursor-pointer overflow-hidden">
                <div className="h-full w-[45%] bg-[#00B050]"></div>
              </div>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <span className="text-sm font-medium">05:30 / 15:00</span>
                  <Volume2 size={20} />
                </div>
                <Maximize size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Lesson Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This lesson provides a comprehensive overview of major drug classifications. We will discuss the differences between therapeutic and pharmacological classes, and explore examples for each category.
            </p>
          </div>

          {/* Attachments */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Attachments</h3>
            <div className="flex flex-col gap-2">
              <div 
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-[#00B050] transition-colors group"
              >
                <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                  <FileText size={20} />
                </div>
                <div className="flex-1 cursor-pointer" onClick={() => openPdfViewer('Study Guide - Drug Classes.pdf')}>
                  <p className="text-sm font-bold text-gray-800">Study Guide - Drug Classes.pdf</p>
                  <p className="text-xs text-gray-500">2.4 MB</p>
                </div>
                <div className="flex items-center gap-2">
                   <button 
                     onClick={() => openPdfViewer('Study Guide - Drug Classes.pdf')}
                     className="p-2 text-gray-400 hover:text-[#00B050] hover:bg-gray-50 rounded-lg"
                     title="View"
                   >
                     <Eye size={20} />
                   </button>
                   <button 
                     onClick={() => handleDownload('Study Guide - Drug Classes.pdf')}
                     className="p-2 text-gray-400 hover:text-[#00B050] hover:bg-gray-50 rounded-lg"
                     title="Download"
                   >
                     <Download size={20} />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Lesson Quiz</h3>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
              <p className="text-green-800 text-sm font-medium">
                Lesson completed! You can now take the quiz.
              </p>
            </div>
            <button 
              onClick={() => navigate(`/courses/${courseId}/quiz/quiz1`)}
              className="w-full py-3 bg-[#00B050] text-white rounded-xl font-bold shadow-md shadow-green-100 hover:bg-[#009945] transition-colors"
            >
              Take Quiz
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 font-medium">
              <ChevronLeft size={18} />
              Previous
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-[#00B050] text-white rounded-xl hover:bg-[#009945] font-medium shadow-lg shadow-green-100">
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {pdfViewerOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-4 text-white bg-black/50">
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span className="font-bold">{currentPdf}</span>
            </div>
            <button 
              onClick={() => setPdfViewerOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="bg-white w-full max-w-4xl h-full rounded-lg shadow-2xl flex flex-col items-center justify-center text-gray-500">
              <FileText size={64} className="mb-4 text-gray-300" />
              <p className="text-xl font-medium">PDF Viewer Mockup</p>
              <p className="text-sm">In a real application, the PDF content would render here.</p>
              <button className="mt-6 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};