import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Settings, Moon, Info } from 'lucide-react';

export function Profile() {
  const { profile, logout } = useAuth();

  return (
    <div className="p-4 flex flex-col gap-6 animate-fade-up">
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="w-24 h-24 rounded-3xl brand-gradient flex items-center justify-center text-3xl font-bold text-white shadow-xl">
          {profile?.name?.[0] || 'U'}
        </div>
        <h1 className="text-xl font-bold mt-2">{profile?.name}</h1>
        <p className="text-sm text-gray-500 capitalize">{profile?.role} • Grade {profile?.grade || 'N/A'}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Account Settings</h2>
        
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100 transition-colors">
            <Moon size={18} className="text-gray-400" />
            <span className="flex-1 text-left font-medium">Dark Mode</span>
            <div className="w-10 h-6 bg-gray-200 rounded-full relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </button>
          
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100 transition-colors">
            <Settings size={18} className="text-gray-400" />
            <span className="flex-1 text-left font-medium">Settings</span>
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100 transition-colors">
            <Info size={18} className="text-gray-400" />
            <span className="flex-1 text-left font-medium">About App</span>
          </button>

          <button 
            onClick={() => logout()}
            className="w-full p-4 flex items-center gap-3 hover:bg-red-50 text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span className="flex-1 text-left font-bold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
