import React from "react";

export default function HintList({ hints, lastLetter, open, onClose }) {
  if (!open || hints.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="pixel-hint-modal relative px-8 py-6 min-w-[320px] max-w-[90vw]">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-2xl font-bold pixelify-sans hover:text-orange-400 focus:outline-none">×</button>
        <h3 className="text-2xl font-bold mb-4 text-white pixelify-sans text-center tracking-wider">HINTS</h3>
        <div className="text-xl font-semibold mb-6 text-white pixelify-sans text-center">
          Words starting with <span className="text-[#ff9800] jersey-25 text-xl">'{lastLetter}'</span>:
        </div>
        <div className="space-y-3">
          {hints.map((hint, index) => (
            <div key={index} className="p-3 bg-[#181818] border border-[#ff9800] rounded-none jersey-25">
              <p className="text-[#ff9800] font-bold text-2xl">{hint.term}</p>
              <p className="text-gray-200 text-lg mt-1">{hint.definition}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .pixel-hint-modal {
          background: #222;
          border: 2.5px solid #fff;
          box-shadow: 0 0 0 2px #ff9800;
          border-radius: 0;
          font-family: 'Pixelify Sans', 'VT323', monospace;
        }
      `}</style>
    </div>
  );
}
