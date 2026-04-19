import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, CheckCircle2, ChevronRight, Lock, BookOpen, Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFirestoreQuery } from '../hooks/useFirestore';
import { where, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { cn } from '../lib/utils';

interface Chapter {
  id: string;
  name: string;
  isCompleted: boolean;
  isSchoolCompleted: boolean;
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

const MOCK_SUBJECTS: Subject[] = [
  { 
    id: 'math', name: 'Mathematics', icon: '📐', color: 'blue', 
    chapters: [
      { id: 'm1', name: 'Algebra Fundamentals', isCompleted: true, isSchoolCompleted: true },
      { id: 'm2', name: 'Quadratic Equations', isCompleted: false, isSchoolCompleted: true },
      { id: 'm3', name: 'Trigonometry', isCompleted: false, isSchoolCompleted: false },
    ]
  },
  { 
    id: 'science', name: 'Science', icon: '🧪', color: 'purple',
    chapters: [
      { id: 's1', name: 'Chemical Reactions', isCompleted: true, isSchoolCompleted: true },
      { id: 's2', name: 'Acids and Bases', isCompleted: true, isSchoolCompleted: true },
      { id: 's3', name: 'Life Processes', isCompleted: false, isSchoolCompleted: false },
    ]
  },
];

export function TimeTable() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const { data: timetableData } = useFirestoreQuery('timetables', [
    where('studentId', '==', user?.uid || '')
  ], [user?.uid]);

  const progress = timetableData?.[0]?.progress || {};
  const schoolProgress = timetableData?.[0]?.schoolSyllabus || {};

  const handleToggleChapter = async (chapterId: string) => {
    if (!user) return;
    const currentStatus = !!progress[chapterId];
    const timetableRef = doc(db, 'timetables', user.uid);
    
    try {
      if (timetableData?.length === 0) {
        await setDoc(timetableRef, {
          studentId: user.uid,
          progress: { [chapterId]: !currentStatus },
          schoolSyllabus: {}
        });
      } else {
        await updateDoc(timetableRef, {
          [`progress.${chapterId}`]: !currentStatus
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className="page pb-24">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#0A0F1E] mb-1">Subject Progress</h1>
        <p className="text-11 font-medium text-[#c4748b]">Track your journey through the syllabus</p>
      </div>

      <div className="sec flex flex-col gap-4">
        {MOCK_SUBJECTS.map((subject) => {
          const completed = subject.chapters.filter(c => !!progress[c.id]).length;
          const total = subject.chapters.length;
          const percent = Math.round((completed / total) * 100);

          return (
            <motion.div 
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="bg-white rounded-[20px] p-5 border border-[#EAECF0] shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
            >
              <div className="text-3xl bg-[#F5F7FA] w-14 h-14 rounded-2xl flex items-center justify-center border border-[#EAECF0]">{subject.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0A0F1E] text-sm">{subject.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1.5 flex-1 bg-[#F5F7FA] rounded-full overflow-hidden border border-[#EAECF0]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      className={cn("h-full rounded-full", 
                        subject.color === 'blue' ? 'bg-[#2563EB]' : 'bg-[#7C3AED]'
                      )}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#64748B]">{percent}%</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#94A3B8] transition-transform group-hover:translate-x-0.5" />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedSubject && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#F5F7FA] flex flex-col"
          >
            <div className="p-4 border-b border-[#EAECF0] bg-white flex items-center justify-between">
              <button 
                onClick={() => setSelectedSubject(null)}
                className="p-2 hover:bg-[#F5F7FA] rounded-full text-[#0A0F1E]"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="font-bold text-lg text-[#0A0F1E]">{selectedSubject.name} Chapters</h2>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {selectedSubject.chapters.map((chapter) => {
                const isCompleted = !!progress[chapter.id];
                const isSchoolDone = !!schoolProgress[chapter.id];

                return (
                  <div 
                    key={chapter.id}
                    onClick={() => handleToggleChapter(chapter.id)}
                    className={cn(
                      "p-4 rounded-[20px] border transition-all cursor-pointer flex items-center justify-between",
                      isCompleted ? "bg-[#ECFDF5] border-[#D1FAE5]" : "bg-white border-[#EAECF0]"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <h4 className={cn("text-sm font-bold", isCompleted ? "text-[#059669]" : "text-[#0A0F1E]")}>
                        {chapter.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        {isSchoolDone ? (
                          <span className="text-[9px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Book size={10} /> Completed in School
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-[#64748B] bg-[#F5F7FA] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock size={10} /> Pending in School
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      isCompleted ? "bg-[#059669] border-[#059669]" : "border-[#EAECF0]"
                    )}>
                      {isCompleted && <CheckCircle2 size={16} className="text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
