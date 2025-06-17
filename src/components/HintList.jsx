import React from "react";

export default function HintList({ hints, lastLetter, open, onClose }) {
  if (!open || hints.length === 0) return null;

  // 모바일 감지
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose} // 배경 클릭 시 닫기
      style={{ touchAction: 'manipulation' }}
    >
      <div
        className="pixel-hint-modal relative px-4 py-4 sm:px-8 sm:py-6 min-w-[90vw] max-w-[98vw] sm:min-w-[320px] sm:max-w-[90vw]"
        style={{
          maxWidth: isMobile ? '98vw' : '90vw',
          minWidth: isMobile ? '90vw' : '320px',
          borderRadius: isMobile ? 0 : undefined,
        }}
        onClick={e => e.stopPropagation()} // 모달 내부 클릭은 닫기 방지
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-3xl font-bold pixelify-sans hover:text-orange-400 focus:outline-none p-2 sm:p-1"
          style={{ zIndex: 10, width: isMobile ? 48 : 36, height: isMobile ? 48 : 36 }}
          aria-label="Close hints"
        >
          ×
        </button>
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
        {/* 모바일에서 하단에도 닫기 버튼 */}
        {isMobile && (
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 text-xl font-bold bg-[#ff9800] text-[#222] rounded pixelify-sans border-2 border-white shadow-lg"
            style={{ fontSize: 22 }}
          >
            Close
          </button>
        )}
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
