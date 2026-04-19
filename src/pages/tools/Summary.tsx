import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Wand2, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

export function SummaryTool() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [detailLevel, setDetailLevel] = useState('concise');

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summarize the following educational content in a ${detailLevel} manner. Focus on key academic concepts and important points to remember. Format using markdown. \n\nContent:\n${text}`,
      });
      setSummary(response.text || '');
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page pb-24">
      <div className="p-4 flex items-center gap-3 border-b border-[#EAECF0] bg-white sticky top-0 z-10">
        <Link to="/" className="p-2 hover:bg-[#F5F7FA] rounded-full transition-colors">
          <ArrowLeft size={20} className="text-[#0A0F1E]" />
        </Link>
        <h1 className="text-lg font-bold text-[#0A0F1E]">AI Chapter Summary</h1>
      </div>

      <div className="sec flex flex-col gap-6 py-6 pb-24">
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-[#EAECF0] flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#7C3AED]">
            <FileText size={20} />
            <h2 className="font-bold">Input Content</h2>
          </div>
          <textarea 
            className="w-full min-h-[200px] p-4 rounded-2xl bg-[#F5F7FA] border border-[#EAECF0] focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all resize-none text-sm leading-relaxed text-[#0A0F1E]"
            placeholder="Paste your chapter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-2">
            {['concise', 'detailed', 'study-guide'].map((level) => (
              <button
                key={level}
                onClick={() => setDetailLevel(level)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold capitalize transition-all ${
                  detailLevel === level 
                  ? 'bg-[#1D4ED8] text-white shadow-md' 
                  : 'bg-[#F5F7FA] text-[#64748B] hover:bg-[#EAECF0]'
                }`}
              >
                {level.replace('-', ' ')}
              </button>
            ))}
          </div>

          <button 
            disabled={loading || !text.trim()}
            onClick={handleGenerate}
            className="w-full py-4 bg-[#7C3AED] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-purple-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? 'Analyzing...' : 'Generate Summary'}
          </button>
        </section>

        {summary && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-[#EAECF0] flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-[#7C3AED]">
              <Wand2 size={20} />
              <h2 className="font-bold">AI Results</h2>
            </div>
            <div className="prose prose-sm prose-slate max-w-none text-[#0A0F1E] leading-relaxed">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
