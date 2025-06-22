'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import soundManager from '../utils/sound'

export default function RuleDialog({ onDialogClose }) {
  const [open, setOpen] = useState(true)

  const handleLetsBegin = () => {
    soundManager.playSelectSound();
    soundManager.playGasterVanishSound();
    setOpen(false);
    if (onDialogClose) {
      onDialogClose();
    }
  };

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-gray-800 p-8 text-left align-middle shadow-2xl ring-2 ring-white transition-all duration-700 animate-fadeInUp border-2 border-white">

          <div className="flex flex-col sm:flex-row gap-8 mt-2">
            {/* Left Column - Grim Reaper Image */}
            <div className="w-full sm:w-1/3 flex items-center justify-center relative mb-6 sm:mb-0">
              <div className="relative w-full h-[220px] sm:h-[300px]">
                <img 
                  src="/reaper_pixels.png" 
                  alt="Grim Reaper" 
                  className="w-full h-auto object-contain absolute animate-dash pixel-shadow-orange"
                />
                <img 
                  src="/reaper_pixels.png" 
                  alt="Grim Reaper Trail 1" 
                  className="w-full h-auto object-contain absolute animate-dash trail-1 pixel-shadow-orange"
                />
                <img 
                  src="/reaper_pixels.png" 
                  alt="Grim Reaper Trail 2" 
                  className="w-full h-auto object-contain absolute animate-dash trail-2 pixel-shadow-orange"
                />
                <img 
                  src="/reaper_pixels.png" 
                  alt="Grim Reaper Trail 3" 
                  className="w-full h-auto object-contain absolute animate-dash trail-3 pixel-shadow-orange"
                />
                
                {/* Speech Bubble */}
                <div className="absolute -top-8 -right-16 animate-pulse">
                  <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-lg">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Speech bubble */}
                    <path 
                      d="M20 10 Q10 10 10 20 L10 40 Q10 50 20 50 L35 50 L25 65 L50 50 L90 50 Q100 50 100 40 L100 20 Q100 10 90 10 Z" 
                      fill="rgba(30, 30, 30, 0.95)" 
                      stroke="#fff" 
                      strokeWidth="3"
                      filter="url(#glow)"
                    />
                    <text 
                      x="55" 
                      y="25" 
                      textAnchor="middle" 
                      className="fill-white text-xs pixelify-sans font-bold"
                    >
                      Your time
                    </text>
                    <text 
                      x="55" 
                      y="40" 
                      textAnchor="middle" 
                      className="fill-white text-xs pixelify-sans font-bold"
                    >
                      is up!
                    </text>
                  </svg>
                </div>

                <style jsx>{`
                  @keyframes dash {
                    0% {
                      transform: translateX(-20%);
                      opacity: 0;
                    }
                    15% {
                      transform: translateX(-10%);
                      opacity: 0.9;
                    }
                    35% {
                      transform: translateX(10%);
                      opacity: 1;
                    }
                    65% {
                      transform: translateX(20%);
                      opacity: 0.9;
                    }
                    85% {
                      transform: translateX(-10%);
                      opacity: 0.7;
                    }
                    100% {
                      transform: translateX(-20%);
                      opacity: 0;
                    }
                  }
                  .animate-dash {
                    animation: dash 2s ease-in-out infinite;
                    filter: drop-shadow(0 0 8px #fff3e0) drop-shadow(0 0 2px #ff9800);
                  }
                  .trail-1 {
                    animation-delay: 0.1s;
                    opacity: 0.7;
                    filter: drop-shadow(0 0 6px #ffe082);
                  }
                  .trail-2 {
                    animation-delay: 0.2s;
                    opacity: 0.5;
                    filter: drop-shadow(0 0 6px #ffb300);
                  }
                  .trail-3 {
                    animation-delay: 0.3s;
                    opacity: 0.3;
                    filter: drop-shadow(0 0 4px #ff9800);
                  }
                  .pixel-shadow-orange {
                    filter: drop-shadow(0 0 12px #fff) drop-shadow(0 0 4px #fff);
                  }
                `}</style>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="w-full sm:w-2/3 ml-0 sm:ml-1">
              <DialogTitle
                as="h3"
                className="ml-6 text-4xl pixelify-sans tracking-wider mb-8 text-[#ff9800] mt-10 sm:mt-8"
              >
                Death's Word Chain
              </DialogTitle>

              <div className="pixelify-sans text-md leading-relaxed space-y-2 text-gray-300">
                <p>You are being chased by the Grim Reaper...</p>
                <p style={{marginBottom: "18px"}}>To escape death, you must play a word chain using GRE vocabulary.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Start each word with the last letter of the previous word.</li>
                  <li>You only get 3 hints. Each costs 0.5 points.</li>
                  <li>Each correct answer gives you +1 point.</li>
                  <li>Earn 70 points to defeat the Reaper!</li>
                </ul>
                <div className="flex justify-between items-center mt-8">
                  <p className="text-white text-3xl italic pixelify-sans">
                    Are you ready..?
                  </p>
                  <button
                    type="button"
                    onClick={handleLetsBegin}
                    className="pixelify-sans inline-flex justify-center rounded bg-[#ff9800] border-2 border-[#fff3e0] px-5 py-2 text-xl font-semibold text-[#222] shadow-md hover:bg-orange-400 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9800]"
                  >
                    Let's Begin
                  </button>
                </div>
              </div>
            </div>
          </div>

        </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
