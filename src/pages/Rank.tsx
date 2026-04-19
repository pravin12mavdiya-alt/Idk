import React from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, CheckCircle2, Trophy, Star, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFirestoreQuery } from '../hooks/useFirestore';
import { orderBy, limit } from 'firebase/firestore';
import { cn } from '../lib/utils';

export function Rank() {
  const { profile } = useAuth();
  
  // In a real app, we'd fetch all users or a specifically prepared ranking collection
  // For now, we'll fetch top marks to simulate a leaderboard
  const { data: marks } = useFirestoreQuery('marks', [
    orderBy('score', 'desc'),
    limit(10)
  ]);

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-8 pb-16 rounded-b-[40px] text-white relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full -ml-12 -mb-12 blur-lg"></div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
            <Trophy size={40} className="text-yellow-300 drop-shadow-lg" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Academic Ranking</h1>
            <p className="text-white/70 text-sm">Based on recent school tests</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 flex flex-col gap-6">
        {/* User Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-blue-50 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              #{profile?.rank || '—'}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Your Position</h3>
              <p className="text-xs text-gray-500">Keep up the great work!</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-black text-[#2563EB]">{profile?.avgScore || '0'}%</span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Avg Score</span>
          </div>
        </motion.div>

        {/* Top Performers (Mock/Placeholder) */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest px-2">Top Performers</h2>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>

          <div className="flex flex-col gap-2">
            {[
              { name: 'Aditya Patel', score: 98, rank: 1, avatar: 'A' },
              { name: 'Priya Sharma', score: 96, rank: 2, avatar: 'P' },
              { name: 'Rohan Mehra', score: 94, rank: 3, avatar: 'R' },
            ].map((user, i) => (
              <div 
                key={i}
                className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm"
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-white",
                  i === 0 ? "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.4)]" : 
                  i === 1 ? "bg-gray-300 shadow-[0_0_12px_rgba(209,213,219,0.4)]" : 
                  "bg-amber-600 shadow-[0_0_12px_rgba(217,119,6,0.4)]"
                )}>
                  {user.rank}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={10} className="text-green-500" />
                    <span className="text-[10px] text-green-600 font-bold">Stable rank</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">{user.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <TrendingUp size={24} className="text-green-500" />
            <p className="text-[10px] font-bold text-gray-400">IMPROVEMENT</p>
            <p className="text-lg font-bold text-gray-900">+5.2%</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <CheckCircle2 size={24} className="text-blue-500" />
            <p className="text-[10px] font-bold text-gray-400">TESTS TAKEN</p>
            <p className="text-lg font-bold text-gray-900">22</p>
          </div>
        </div>
      </div>
    </div>
  );
}
