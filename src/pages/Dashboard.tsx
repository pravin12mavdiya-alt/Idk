import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const FEATURES = [
  { id: 'fast-writing', name: 'Fast Writing Tool', desc: 'Take a photo of any page and listen to it read aloud', color: 'c-blue', iconColor: 'ib-blue', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { id: 'summary', name: 'AI Chapter Summary', desc: 'Paste a chapter and get a clean AI summary in seconds', color: 'c-violet', iconColor: 'ib-violet', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { id: 'test-gen', name: 'AI Test Generator', desc: 'Turn any topic or notes into a full test with one click', color: 'c-amber', iconColor: 'ib-amber', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
  { id: 'homework', name: 'Homework Helper', desc: 'AI walks you through answers step by step, using your notes', color: 'c-pink', iconColor: 'ib-pink', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3"/></svg> },
  { id: 'pdf-lib', name: 'PDF Library', desc: 'Browse preset books or upload your own PDF to read', color: 'c-teal', iconColor: 'ib-teal', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
  { id: 'resources', name: 'Student Resources', desc: 'Top study sites all in one place, sorted by subject', color: 'c-lime', iconColor: 'ib-lime', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
  { id: 'notebook', name: 'AI Notebook', desc: 'Save notes and let AI rewrite them cleaner and smarter', color: 'c-indigo', iconColor: 'ib-indigo', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { id: 'diagram', name: 'AI Diagram', desc: 'Generate diagrams, flowcharts and tables with AI — embed them straight into your notes', color: 'c-purple', iconColor: 'ib-purple', svg: <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/><path d="M9 21V9"/><circle cx="6" cy="6" r="1" fill="#9333EA" stroke="none"/><circle cx="12" cy="6" r="1" fill="#9333EA" stroke="none"/><circle cx="18" cy="6" r="1" fill="#9333EA" stroke="none"/></svg> },
];

export function Dashboard() {
  const { profile } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streak, setStreak] = useState(0);
  const [testsDone, setTestsDone] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    // ── HERO CANVAS PARTICLES ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: any[] = [];

    const resizeCanvas = () => {
      const hero = canvas.parentElement;
      if (hero) {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
      }
    };

    const createParticles = () => {
      particles = [];
      const count = 28;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.5 + 0.8,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.6 + 0.3
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });
    };

    const updateParticles = () => {
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
    };

    let animationId: number;
    const loop = () => {
      drawParticles();
      updateParticles();
      animationId = requestAnimationFrame(loop);
    };

    resizeCanvas();
    createParticles();
    loop();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (profile) {
      animateValue(0, profile.streak || 0, setStreak, 1000);
      animateValue(0, profile.testsDone || 0, setTestsDone, 1200);
      animateValue(0, profile.avgScore || 0, setAvgScore, 1400);
    }
  }, [profile]);

  function animateValue(start: number, end: number, setter: (v: number) => void, duration: number) {
    const startTime = performance.now();
    function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
    function tick(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      setter(Math.max(start, Math.floor(easeOut(t) * end)));
      if (t < 1) requestAnimationFrame(tick);
      else setter(end);
    }
    requestAnimationFrame(tick);
  }

  return (
    <div className="page pt-0">
      {/* HERO */}
      <div className="hero">
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }}></canvas>
        <div className="hero-ring1"></div>
        <div className="hero-ring2"></div>
        
        {/* floating orbs */}
        <div style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', top: '20px', left: '30px', animation: 'floatUp 4s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', bottom: '30px', left: '60px', animation: 'floatUpSlow 5s ease-in-out infinite 1s' }}></div>
        <div style={{ position: 'absolute', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', top: '50px', right: '70px', animation: 'floatUpSlow 3.5s ease-in-out infinite 0.5s' }}></div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: '20px', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)', animation: 'shimmerPass 4s ease-in-out infinite' }}></div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-top">
            <div>
              <div className="hero-greet">Good morning, {profile?.name?.split(' ')[0] || 'Student'}</div>
              <div className="hero-name">Ready to make<br/>progress today?</div>
            </div>
            <div className="hero-streak">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img 
                  id="streakFlame" 
                  src="data:image/png;base64,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" 
                  width="64" height="56" 
                  style={{ marginBottom: '-18px', position: 'relative', zIndex: 1, objectFit: 'contain', animation: 'floatUpSlow 3s ease-in-out infinite' }} 
                />
                <svg width="48" height="36" viewBox="0 0 48 36" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
                  <text 
                    x="24" y="30" textAnchor="middle"
                    style={{ fontFamily: '"Fredoka One", sans-serif' }}
                    fontSize="30" fontWeight="400"
                    stroke="#FF9600" strokeWidth="5"
                    strokeLinejoin="round" strokeLinecap="round"
                    paintOrder="stroke fill"
                    fill="white"
                  >
                    {streak}
                  </text>
                </svg>
                <div className="hs-l">Day streak</div>
              </div>
            </div>
          </div>

          {/* animated progress bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Daily goal progress</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>2 / 3 tasks</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.18)', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '67%' }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: '100%', background: 'rgba(255,255,255,0.9)', borderRadius: '10px' }}
              />
            </div>
          </div>

          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-real w-full flex flex-col items-center">
                <div className="hstat-v">{testsDone}</div>
                <div className="hstat-l">Tests Done</div>
              </div>
            </div>
            <div className="hstat">
              <div className="hstat-real w-full flex flex-col items-center">
                <div className="hstat-v">{avgScore}%</div>
                <div className="hstat-l">Avg Score</div>
              </div>
            </div>
            <div className="hstat">
              <div className="hstat-real w-full flex flex-col items-center">
                <div className="hstat-v">#{profile?.rank || '—'}</div>
                <div className="hstat-l">Rank</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACCESS */}
      <div className="sec">
        <div className="sec-row">
          <div><div className="sec-title">Quick Access</div></div>
        </div>
        <div className="qscroll overflow-x-auto scrollbar-hide">
          <div className="qcard">
            <div className="qcard-icon ib-indigo"><svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="#4338CA"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <div className="qcard-name">Notes</div>
            <div className="qcard-meta">AI notebook</div>
            <div className="qcard-tag" style={{ background: '#EEF2FF', color: '#4338CA' }}>Open</div>
          </div>

          <Link to="/tool/summary" className="qcard">
            <div className="qcard-icon ib-green"><svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="#059669"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
            <div className="qcard-name">AI Summary</div>
            <div className="qcard-meta">Paste & go</div>
            <div className="qcard-tag" style={{ background: '#ECFDF5', color: '#059669' }}>Try it</div>
          </Link>

          <div className="qcard">
            <div className="qcard-icon ib-purple"><svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="#9333EA"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div>
            <div className="qcard-name">AI Diagram</div>
            <div className="qcard-meta">Charts & flows</div>
            <div className="qcard-tag" style={{ background: '#FAF5FF', color: '#9333EA' }}>Create</div>
          </div>
        </div>
      </div>

      <div className="dv"></div>

      {/* ALL FEATURES */}
      <div className="sec">
        <div className="sec-row">
          <div>
            <div className="sec-title">All Features</div>
            <div className="sec-sub">Everything you need to learn smarter</div>
          </div>
        </div>

        <div className="feat-list">
          {FEATURES.slice(0, 4).map((f, i) => (
            <Link to={`/tool/${f.id}`} key={f.id} className={`fcard ${f.color}`}>
              <div className={`fcard-icon ${f.iconColor}`}>{f.svg}</div>
              <div className="fcard-body">
                <div className="fcard-name text-[#0A0F1E]">{f.name}</div>
                <div className="fcard-desc font-normal">{f.desc}</div>
              </div>
              <div className="fcard-arrow"><ChevronRight size={13} strokeWidth={3} /></div>
              <div className="fcard-shimmer"></div>
            </Link>
          ))}
          
          <AnimatePresence>
            {showAll && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="feat-extra overflow-hidden"
              >
                <div className="flex flex-col gap-[10px] pt-[10px]">
                  {FEATURES.slice(4).map((f) => (
                    <Link to={`/tool/${f.id}`} key={f.id} className={`fcard ${f.color}`}>
                      <div className={`fcard-icon ${f.iconColor}`}>{f.svg}</div>
                      <div className="fcard-body">
                        <div className="fcard-name text-[#0A0F1E]">{f.name}</div>
                        <div className="fcard-desc font-normal">{f.desc}</div>
                      </div>
                      <div className="fcard-arrow"><ChevronRight size={13} strokeWidth={3} /></div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className={`show-all ${showAll ? 'open' : ''}`} onClick={() => setShowAll(!showAll)}>
          <span>{showAll ? 'Show less' : `Show all ${FEATURES.length} features`}</span>
          <svg className="transition-transform duration-350" style={{ transform: showAll ? 'rotate(180deg)' : 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>

      <div className="dv"></div>

      {/* TODAY'S ACTIVITY */}
      <div className="sec">
        <div className="sec-row">
          <div>
            <div className="sec-title">Today's Activity</div>
            <div className="sec-sub">Pick up where you left off</div>
          </div>
          <button className="sec-btn">View all</button>
        </div>

        <div className="arow">
          <div className="arow-icon ib-blue"><svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="#2563EB"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
          <div className="arow-info"><div className="arow-name">Vocab Quick Test</div><div className="arow-meta">5 questions · ~3 mins</div></div>
          <div className="arow-right"><button className="abtn ab-blue">Start</button><span className="atag" style={{ background: '#EFF6FF', color: '#2563EB' }}>New</span></div>
        </div>

        <div className="arow">
          <div className="arow-icon ib-violet"><svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="#7C3AED"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
          <div className="arow-info"><div className="arow-name">Chapter Summary</div><div className="arow-meta">History · Chapter 6</div></div>
          <div className="arow-right"><button className="abtn ab-amber">Review</button><span className="atag" style={{ background: '#FFFBEB', color: '#D97706' }}>In Progress</span></div>
        </div>

        <div className="arow">
          <div className="arow-icon ib-orange"><svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="#EA580C"><path d="M8 21V11M12 21V3M16 21v-7"/></svg></div>
          <div className="arow-info"><div className="arow-name">Leaderboard</div><div className="arow-meta">You're ranked #4 today</div></div>
          <div className="arow-right"><button className="abtn ab-slate">View</button><span className="atag" style={{ background: '#FFF7ED', color: '#EA580C' }}>Top 5</span></div>
        </div>
      </div>

      <div style={{ height: '20px' }}></div>
    </div>
  );
}
