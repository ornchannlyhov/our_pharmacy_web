import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Briefcase, ChevronRight, Settings, LogOut, Moon, Globe, Bell, BarChart2, Award, History, X, Copy, CheckCircle, Loader2, Send } from 'lucide-react';
import { MOCK_USER } from '../constants';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'km'>('en');
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  
  // Telegram Flow States
  const [telegramStatus, setTelegramStatus] = useState<'idle' | 'waiting' | 'connected'>('idle');
  const [isSimulatingConnection, setIsSimulatingConnection] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'km' : 'en');
  };

  const simulateTelegramConnection = () => {
    setIsSimulatingConnection(true);
    setTelegramStatus('waiting');
    
    // Simulate user "sending" the code
    setTimeout(() => {
      setTelegramStatus('connected');
      setIsSimulatingConnection(false);
    }, 3000);
  };

  const disconnectTelegram = () => {
    setTelegramStatus('idle');
    setShowTelegramModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8 relative">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: User Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="relative inline-block mb-4">
               <img 
                 src={MOCK_USER.avatar} 
                 alt={MOCK_USER.name} 
                 className="w-24 h-24 rounded-full border-4 border-green-50 object-cover mx-auto"
               />
               <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 hover:text-[#00B050]">
                 <Settings size={16} />
               </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{MOCK_USER.name}</h2>
            <p className="text-gray-500 text-sm">@{MOCK_USER.username}</p>
            {telegramStatus === 'connected' && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-[#0088cc] bg-blue-50 py-1 px-3 rounded-full w-fit mx-auto">
                <Send size={12} fill="currentColor" /> Telegram Connected
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Contact Info</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-gray-400" />
                <span>{MOCK_USER.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-gray-400" />
                <span>{MOCK_USER.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Briefcase size={18} className="text-gray-400" />
                <span>{MOCK_USER.department}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} className="text-gray-400" />
                <span>{MOCK_USER.branch}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 font-bold text-gray-500 text-xs uppercase tracking-wider">
               Quick Actions
            </div>
            
            <button 
              onClick={() => navigate('/certificates')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-[#00B050] rounded-xl">
                  <Award size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">My Certificates</h3>
                  <p className="text-sm text-gray-500">View earned certificates</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button 
              onClick={() => navigate('/history')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
            >
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-green-50 text-[#00B050] rounded-xl">
                  <History size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">Course History</h3>
                  <p className="text-sm text-gray-500">View completed courses</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button 
              onClick={() => navigate('/profile/study-dashboard')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-green-50 text-[#00B050] rounded-xl">
                  <BarChart2 size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">Study Dashboard</h3>
                  <p className="text-sm text-gray-500">View your progress</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 font-bold text-gray-500 text-xs uppercase tracking-wider">
              Settings
            </div>
            <div className="divide-y divide-gray-50">
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Moon size={20} /></div>
                  <span className="font-medium text-gray-700">Appearance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {isDarkMode ? 'Dark' : 'Light'} <ChevronRight size={16} />
                </div>
              </button>
              
              <button 
                onClick={toggleLanguage}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Globe size={20} /></div>
                  <span className="font-medium text-gray-700">Language</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {language === 'en' ? 'English' : 'Khmer'} <ChevronRight size={16} />
                </div>
              </button>

              <button 
                onClick={() => setShowTelegramModal(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Bell size={20} /></div>
                  <span className="font-medium text-gray-700">Notifications</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {telegramStatus === 'connected' ? (
                    <span className="text-[#00B050] font-bold">Connected</span>
                  ) : (
                    <span>Setup</span>
                  )}
                  <ChevronRight size={16} />
                </div>
              </button>
            </div>
          </div>

           {/* Logout Button */}
           <button 
             onClick={handleLogout}
             className="w-full p-4 rounded-xl border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
           >
             <LogOut size={20} />
             Log Out
           </button>
        </div>
      </div>

      {/* Telegram Modal */}
      {showTelegramModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
               <div className="flex items-center gap-2 font-bold text-lg">
                 <div className="bg-[#0088cc] text-white p-1.5 rounded-full">
                    <Send size={16} fill="currentColor" />
                 </div>
                 Connect Telegram
               </div>
               <button onClick={() => setShowTelegramModal(false)} className="text-gray-400 hover:text-gray-600">
                 <X size={20} />
               </button>
            </div>
            
            {telegramStatus === 'connected' ? (
              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-[#00B050]">
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Successfully Connected!</h3>
                  <p className="text-gray-500 mt-2 text-sm">You will now receive notifications from Our Pharmacy via Telegram.</p>
                </div>
                <button 
                  onClick={disconnectTelegram}
                  className="text-red-500 text-sm font-bold hover:underline"
                >
                  Disconnect Account
                </button>
                <button 
                  onClick={() => setShowTelegramModal(false)}
                  className="w-full py-3 bg-[#00B050] text-white rounded-xl font-bold hover:bg-[#009945]"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-6">
                {/* Simulated Loading/Waiting State */}
                {isSimulatingConnection ? (
                  <div className="text-center py-8">
                     <Loader2 size={40} className="animate-spin text-[#00B050] mx-auto mb-4" />
                     <p className="font-bold text-gray-900">Waiting for your message...</p>
                     <p className="text-xs text-gray-500 mt-2">Please send the code to the bot on Telegram.</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#5ce197] rounded-2xl p-6 text-center text-white mb-6 relative overflow-hidden">
                      <p className="text-white/90 text-sm mb-2 font-medium">Your Registration Code</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold tracking-wider">5TG67MRJHFV3</span>
                        <button className="text-white/80 hover:text-white" title="Copy">
                          <Copy size={20} />
                        </button>
                      </div>
                      <p className="text-red-500 text-xs font-medium mt-2">Expires in 15 minutes</p>
                    </div>

                    <div className="space-y-4">
                       <h4 className="font-bold text-gray-900">Instructions:</h4>
                       <div className="space-y-4">
                          <div className="flex gap-3">
                             <div className="w-6 h-6 rounded-full bg-[#81C784] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                             <p className="text-sm text-gray-600">Open Telegram and search for <a href="#" className="text-[#00B050] font-bold underline">@our_pharmacy_informer_bot</a></p>
                          </div>
                          <div className="flex gap-3">
                             <div className="w-6 h-6 rounded-full bg-[#81C784] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                             <p className="text-sm text-gray-600">Start a chat with the bot</p>
                          </div>
                          <div className="flex gap-3">
                             <div className="w-6 h-6 rounded-full bg-[#81C784] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                             <p className="text-sm text-gray-600">Send the <span className="bg-green-50 text-[#00B050] px-1 rounded font-mono text-xs">/start</span> command</p>
                          </div>
                          <div className="flex gap-3">
                             <div className="w-6 h-6 rounded-full bg-[#81C784] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">4</div>
                             <div className="text-sm text-gray-600">
                               <p>Copy and send the registration code above.</p>
                             </div>
                          </div>
                       </div>
                       
                       <button 
                         onClick={simulateTelegramConnection}
                         className="w-full mt-4 py-3 border border-[#00B050] text-[#00B050] rounded-xl font-bold hover:bg-green-50 transition-colors text-sm"
                       >
                         I've sent the code
                       </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};