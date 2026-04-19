import React from 'react';
import { Home, User, BookOpen, TrendingUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Navbar() {
  return (
    <nav className="bnav fixed bottom-0 left-0 right-0 h-[68px] bg-white border-t border-[#EAECF0] flex items-center justify-evenly z-200 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] px-1.5">
      <NavLink to="/" className={({ isActive }) => cn("nb flex-1 flex flex-col items-center justify-center gap-0.5 border-none bg-transparent cursor-pointer relative py-1.5 rounded-xl transition-all", isActive && "on")}>
        <Home size={20} className="svg" strokeWidth={2} />
        <span className="nb-l text-[10px] font-semibold tracking-[0.1px]">Home</span>
      </NavLink>
      
      <NavLink to="/timetable" className={({ isActive }) => cn("nb flex-1 flex flex-col items-center justify-center gap-0.5 border-none bg-transparent cursor-pointer relative py-1.5 rounded-xl transition-all -translate-x-[5px]", isActive && "on")}>
        <BookOpen size={20} className="svg" strokeWidth={2} />
        <span className="nb-l text-[10px] font-semibold tracking-[0.1px]">Time-Table</span>
      </NavLink>

      <div className="w-[62px] shrink-0"></div>

      <NavLink to="/rank" className={({ isActive }) => cn("nb flex-1 flex flex-col items-center justify-center gap-0.5 border-none bg-transparent cursor-pointer relative py-1.5 rounded-xl transition-all translate-x-[5px]", isActive && "on")}>
        <TrendingUp size={20} className="svg" strokeWidth={2} />
        <span className="nb-l text-[10px] font-semibold tracking-[0.1px]">Rank</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => cn("nb flex-1 flex flex-col items-center justify-center gap-0.5 border-none bg-transparent cursor-pointer relative py-1.5 rounded-xl transition-all", isActive && "on")}>
        <User size={20} className="svg" strokeWidth={2} />
        <span className="nb-l text-[10px] font-semibold tracking-[0.1px]">Profile</span>
      </NavLink>
    </nav>
  );
}
