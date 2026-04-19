import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TimeTable } from './pages/TimeTable';
import { Rank } from './pages/Rank';
import { Profile } from './pages/Profile';
import { SummaryTool } from './pages/tools/Summary';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 animate-pulse">
           <span className="text-white font-bold italic tracking-tighter">IM</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Loading InMotion</p>
      </div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

function LoginPage() {
  const { signIn } = useAuth();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F7FA] p-6 text-center">
      <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6] flex items-center justify-center shadow-2xl mb-8 animate-[logoPulse_3s_ease-in-out_infinite] group transition-transform hover:scale-105">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-[#0A0F1E]">InMotion</h1>
      <p className="text-[#64748B] font-semibold uppercase tracking-[0.1em] text-[10px] mb-12">Learning Evolved • Motion is Everything</p>
      
      <button 
        onClick={() => signIn()}
        className="w-full max-w-xs py-4 bg-white border border-[#EAECF0] rounded-2xl shadow-sm flex items-center justify-center gap-3 font-semibold hover:bg-gray-50 active:scale-95 transition-all text-[#0A0F1E]"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="timetable" element={<TimeTable />} />
          <Route path="rank" element={<Rank />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tool/summary" element={<SummaryTool />} />
          
          {/* Tool Sub-pages placeholders */}
          <Route path="tool/:id" element={
            <div className="p-4 flex flex-col gap-4 animate-fade-up">
              <h1 className="text-xl font-bold">Tool Page</h1>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm">This feature is being prepared for implementation.</p>
              </div>
            </div>
          } />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
