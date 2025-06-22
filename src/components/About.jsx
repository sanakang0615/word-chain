import React, { useState } from "react";
import soundManager from '../utils/sound';

export default function About() {
  const [open, setOpen] = useState(false);

  // Close sidebar when clicking outside
  React.useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (e.target.closest(".pixel-about-sidebar") || e.target.closest(".about-btn")) return;
      setOpen(false);
    };
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [open]);

  const handleAboutToggle = () => {
    soundManager.playSelectSound();
    setOpen((v) => !v);
  };

  const handleClose = () => {
    soundManager.playSelectSound();
    setOpen(false);
  };

  return (
    <>
      {/* About Button */}
      <button
        className="about-btn fixed top-1/2 left-0 z-40 -translate-y-1/2 bg-[#ff9800] border-2 border-white px-1 py-2 rounded-none pixelify-sans text-base text-[#222] font-bold shadow-lg hover:bg-orange-400 focus:outline-none tracking-widest flex items-center justify-center"
        style={{ borderRight: 'none', borderRadius: 0, letterSpacing: '0.08em', height: 120, width: 36, top: 'calc(50% + 20px)' }}
        onClick={handleAboutToggle}
        aria-label="Open about information"
      >
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '1.1rem', letterSpacing: '0.1em' }}>ABOUT</span>
      </button>
      {/* Overlay for closing and blur */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      )}
      {/* Sidebar */}
      <div
        className={`pixel-about-sidebar fixed top-0 left-0 h-full z-50 bg-[#181818] border-r-2 border-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 320, minWidth: 220 }}
      >
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold pixelify-sans hover:text-orange-400 focus:outline-none"
          onClick={handleClose}
          aria-label="Close about information"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white pixelify-sans p-4 border-b-2 border-white tracking-wider">About This Game</h2>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="p-3 rounded pixelify-sans text-base border border-[#ff9800] bg-[#222]/80 text-white">
              <h3 className="text-lg font-bold text-[#ff9800] mb-2"><span className="tossface mr-1">💻</span> Hi, I'm Sana Kang</h3>
              <p className="text-sm leading-relaxed">
                I was studying vocabulary when I suddenly decided to develop this game! 
                If you want to know more about me, visit <a href="https://sanakang.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 hover:underline">sanakang.xyz</a>.
              </p>
            </div>

            <div className="p-3 rounded pixelify-sans text-base border border-[#ff9800] bg-[#222]/80 text-white">
              <h3 className="text-lg font-bold text-[#ff9800] mb-2"><span className="tossface mr-1">🎮</span> Word Chain Game</h3>
              <p className="text-sm leading-relaxed">
                A challenging word chain game where you battle against the Grim Reaper! 
                Connect words by their last and first letters while managing your HP and hints.
              </p>
            </div>
            
            <div className="p-3 rounded pixelify-sans text-base border border-[#ff9800] bg-[#222]/80 text-white">
              <h3 className="text-lg font-bold text-[#ff9800] mb-2"><span className="tossface mr-0.5">📚</span> Word Database</h3>
              <p className="text-sm leading-relaxed mb-2">
                Words and definitions sourced from:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <a href="https://blog.naver.com/cyclonics_kr/222238898109" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:underline">Anki GRE Vocabulary dataset</a></li>
                <li>• Various educational sources</li>
              </ul>
            </div>

            <div className="p-3 rounded pixelify-sans text-base border border-[#ff9800] bg-[#222]/80 text-white">
              <h3 className="text-lg font-bold text-[#ff9800] mb-2"><span className="tossface mr-0.5">🎵</span> Audio Sources</h3>
              <p className="text-sm leading-relaxed mb-2">
                Sound effects and music from:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <a href="https://www.myinstants.com/en/search/?name=undertale" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:underline">Undertale game soundtrack</a></li>
              </ul>
            </div>

            <div className="p-3 rounded pixelify-sans text-base border border-[#ff9800] bg-[#222]/80 text-white">
              <h3 className="text-lg font-bold text-[#ff9800] mb-2"><span className="tossface mr-0.5">🎨</span> Visual Assets</h3>
              <p className="text-sm leading-relaxed mb-2">
                Graphics and animations:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Generated with GPT-4o image generation</li>
                <li>• Inspired by Undertale's design</li>
              </ul>
            </div>

            {/* <div className="p-3 rounded pixelify-sans text-base border border-[#ff9800] bg-[#222]/80 text-white">
              <h3 className="text-lg font-bold text-[#ff9800] mb-2"><span className="tossface mr-0.5">⚙️</span> Game Features</h3>
              <ul className="text-sm space-y-1 ml-4">
                <li>• HP management system</li>
                <li>• Hint system (3 per round)</li>
                <li>• Word history tracking</li>
                <li>• Sound effects and music</li>
                <li>• Responsive design</li>
                <li>• Infinite mode after defeat</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <style jsx>{`
        .pixel-about-sidebar {
          font-family: 'Pixelify Sans', 'VT323', monospace;
          border-radius: 0;
          overscroll-behavior: none;
        }
        .pixel-about-sidebar > div {
          overscroll-behavior: none;
        }
      `}</style>
    </>
  );
} 