import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CERTIFICATES } from '../constants';
import { Award, Download } from 'lucide-react';

export const Certificates: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="text-[#00B050]" />
          My Certificates
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_CERTIFICATES.length > 0 ? (
          MOCK_CERTIFICATES.map(cert => (
            <div 
              key={cert.id} 
              onClick={() => navigate(`/profile/certificates/${cert.id}`)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden border-b border-gray-50">
                <img 
                  src={cert.imageUrl} 
                  alt={cert.courseName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm text-gray-800 shadow-lg">
                     View Certificate
                   </div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{cert.courseName}</h4>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className="text-gray-500">Issued: {cert.issueDate}</span>
                  <button className="text-[#00B050] hover:text-[#009945]">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
            <Award className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-lg font-medium text-gray-900">No certificates yet</p>
            <p className="mb-6">Complete courses and pass exams to earn certificates!</p>
            <button 
              onClick={() => navigate('/courses')}
              className="px-6 py-2 bg-[#00B050] text-white rounded-full font-bold hover:bg-[#009945] transition-colors"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};