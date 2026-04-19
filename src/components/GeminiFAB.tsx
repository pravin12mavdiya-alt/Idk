import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Edit3, BookOpen, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function GeminiFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'summary', name: 'AI Summary', icon: Edit3, color: 'bg-purple-100 text-purple-600', path: '/tool/summary' },
    { id: 'test-gen', name: 'Test Gen', icon: BookOpen, color: 'bg-amber-100 text-amber-600', path: '/tool/test-gen' },
    { id: 'homework', name: 'homework', icon: Clock, color: 'bg-pink-100 text-pink-600', path: '/tool/homework' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50, x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, y: 50, x: '-50%' }}
              className="fixed bottom-[130px] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-[32px] p-5 shadow-2xl z-[100] border border-gray-100"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Sparkles size={16} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">AI Quick Actions</h3>
                </div>
                {menuItems.map((item) => (
                  <Link 
                    to={item.path} 
                    key={item.id}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-gray-700 capitalize">{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 120, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ delay: 0.35, type: 'spring', damping: 20, stiffness: 100 }}
        whileTap={{ scale: 0.91 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[46px] left-1/2 w-[62px] h-[62px] z-[100] flex items-center justify-center cursor-pointer group"
        aria-label="Gemini AI"
      >
        <div className="absolute inset-0 bg-white rounded-full shadow-[0_6px_22px_rgba(37,99,235,0.35),0_2px_8px_rgba(0,0,0,0.12)]"></div>
        {/* Animated Gradient Ring */}
        <div className="absolute inset-[-3px] rounded-full animate-[spin_2.5s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity bg-[conic-gradient(from_0deg,rgba(37,99,235,0)_0deg,rgba(96,165,250,0.9)_60deg,rgba(139,92,246,0.7)_90deg,rgba(37,99,235,0)_180deg,rgba(96,165,250,0.9)_240deg,rgba(139,92,246,0.7)_270deg,rgba(37,99,235,0)_360deg)] [mask-image:radial-gradient(circle,transparent_30px,black_31px,black_33px,transparent_34px)]"></div>

        {isOpen ? (
          <X className="w-8 h-8 text-blue-600 relative z-10" strokeWidth={2.5} />
        ) : (
          <img 
            src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d473530c2731b4ce6524.svg" 
            alt="Gemini" 
            className="w-9 h-9 relative z-10 group-hover:scale-110 transition-transform"
          />
        )}
      </motion.button>
    </>
  );
}
