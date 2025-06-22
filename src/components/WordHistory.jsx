import React, { useState } from "react";
import soundManager from '../utils/sound';

export default function WordHistory({ history }) {
  const [open, setOpen] = useState(false);

  // Close sidebar when clicking outside
  React.useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (e.target.closest(".pixel-word-sidebar") || e.target.closest(".bookmark-btn")) return;
      setOpen(false);
    };
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [open]);

  const handleHistoryToggle = () => {
    soundManager.playSelectSound();
    setOpen((v) => !v);
  };

  const handleClose = () => {
    soundManager.playSelectSound();
    setOpen(false);
  };

  return (
    <>
      {/* Bookmark Button */}
      <button
        className="bookmark-btn fixed top-1/2 left-0 z-40 -translate-y-1/2 bg-[#ff9800] border-2 border-white px-1 py-2 rounded-none pixelify-sans text-base text-[#222] font-bold shadow-lg hover:bg-orange-400 focus:outline-none tracking-widest flex items-center justify-center"
        style={{ borderRight: 'none', borderRadius: 0, letterSpacing: '0.08em', height: 120, width: 36 }}
        onClick={handleHistoryToggle}
        aria-label="Open word history"
      >
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '1.1rem', letterSpacing: '0.1em' }}>HISTORY</span>
      </button>
      {/* Overlay for closing and blur */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      )}
      {/* Sidebar */}
      <div
        className={`pixel-word-sidebar fixed top-0 left-0 h-full z-50 bg-[#181818] border-r-2 border-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 320, minWidth: 220 }}
      >
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold pixelify-sans hover:text-orange-400 focus:outline-none"
          onClick={handleClose}
          aria-label="Close word history"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white pixelify-sans p-4 border-b-2 border-white tracking-wider">Word History</h2>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className={`p-2 rounded pixelify-sans text-base border border-[#ff9800] bg-[#222]/80 ${
                  item.source === "system"
                    ? "text-[#ff9800]"
                    : "text-blue-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-70">
                    {item.source === "system" ? <span className="tossface">🪦</span> : <span className="tossface">👤</span>} {item.source === "system" ? "Reaper said:" : "You said:"}
                  </span>
                  <span className="font-medium jersey-25 text-lg">{item.word}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .pixel-word-sidebar {
          font-family: 'Pixelify Sans', 'VT323', monospace;
          border-radius: 0;
          overscroll-behavior: none;
        }
        .pixel-word-sidebar > div {
          overscroll-behavior: none;
        }
      `}</style>
    </>
  );
}
