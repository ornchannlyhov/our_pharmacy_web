import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Download, Share2 } from 'lucide-react';
import { MOCK_CERTIFICATES, MOCK_USER } from '../constants';

export const CertificateViewer: React.FC = () => {
  const navigate = useNavigate();
  const { certificateId } = useParams();
  
  // For demo, just show first cert if ID not found, or generate a placeholder
  const cert = MOCK_CERTIFICATES.find(c => c.id === certificateId) || {
    id: 'new',
    courseName: 'Pharmacology Mid-Term',
    issueDate: new Date().toLocaleDateString(),
    imageUrl: 'https://picsum.photos/800/600'
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 text-white bg-black/50 backdrop-blur-md">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <span className="font-bold">Viewing Certificate</span>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors" title="Share">
            <Share2 size={24} />
          </button>
          <button className="flex items-center gap-2 bg-[#00B050] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#009945] transition-colors">
            <Download size={20} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Viewer */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 bg-[#333]">
        <div className="bg-white text-gray-900 p-8 sm:p-16 max-w-4xl w-full aspect-[4/3] shadow-2xl relative flex flex-col items-center justify-center text-center border-[16px] border-[#00B050]/10">
           {/* Certificate Content Simulation */}
           <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-[#00B050]"></div>
           <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-[#00B050]"></div>

           <div className="mb-12">
             <h1 className="text-4xl sm:text-6xl font-serif text-[#00B050] font-bold mb-4">Certificate</h1>
             <p className="text-xl text-gray-500 uppercase tracking-widest">Of Completion</p>
           </div>

           <div className="mb-8">
             <p className="text-gray-500 italic mb-4">This certifies that</p>
             <h2 className="text-3xl sm:text-5xl font-bold border-b-2 border-gray-200 pb-4 px-12 inline-block">
               {MOCK_USER.name}
             </h2>
           </div>

           <div className="mb-12">
             <p className="text-gray-500 italic mb-2">Has successfully completed the course</p>
             <h3 className="text-2xl font-bold text-gray-800">{cert.courseName}</h3>
           </div>

           <div className="flex justify-between w-full max-w-lg mt-8">
             <div className="text-center">
               <p className="font-bold border-t border-gray-400 pt-2 px-8">{new Date(cert.issueDate).toLocaleDateString()}</p>
               <p className="text-xs text-gray-400 uppercase mt-1">Date</p>
             </div>
             <div className="text-center">
               <div className="font-signature text-2xl mb-1 px-8 font-serif italic text-gray-600">Director Signature</div>
               <p className="font-bold border-t border-gray-400 pt-2 px-8">Director of Education</p>
               <p className="text-xs text-gray-400 uppercase mt-1">Signature</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};