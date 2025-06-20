import React, { useState, useEffect } from "react";
import InputPanel from "./InputPanel";
import HintList from "./HintList";
import WordHistory from "./WordHistory";
import ScorePanel from "./ScorePanel";
import wordList from "../data/anki.json";
import RuleDialog from './RuleDialog';
import { CheckCircleIcon, XMarkIcon, XCircleIcon } from '@heroicons/react/20/solid';

const getHintWords = (startLetter, usedWords) => {
  const hints = wordList.filter(w => w.term.startsWith(startLetter) && !usedWords.includes(w.term));
  return hints.map(w => ({ term: w.term, definition: w.definition })).slice(0, 3);
};

// Add a hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function GameBoard() {
  const [systemWord, setSystemWord] = useState("");
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [hints, setHints] = useState([]);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(100);
  const [hintCount, setHintCount] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);
  const [lastCorrectWord, setLastCorrectWord] = useState("");
  const [hearts, setHearts] = useState([true, true, true]); // Track heart states
  const [showHintModal, setShowHintModal] = useState(false);
  const [hpInfinite, setHpInfinite] = useState(false); // HP 무한대 모드
  const [showLoseModal, setShowLoseModal] = useState(false); // 패배 모달
  const [showSlashEffect, setShowSlashEffect] = useState(false); // 슬래시 효과
  const WIN_SCORE = 100;
  const LOSE_SCORE = 0;
  
  const isMobile = useIsMobile();

  useEffect(() => {
    const randomStart = wordList[Math.floor(Math.random() * wordList.length)].term;
    setSystemWord(randomStart);
    setHistory([{ word: randomStart, source: "system" }]);
  }, []);

  useEffect(() => {
    if (score <= 0 && !hpInfinite) {
      setShowLoseModal(true);
    }
  }, [score, hpInfinite]);

  const lastLetter = systemWord.slice(-1);
  const usedWords = history.map(h => h.word);

  const handleSubmit = () => {
    const match = wordList.find(
      (w) => w.term === userInput && !usedWords.includes(userInput)
    );
  
    if (usedWords.includes(userInput)) {
      setMessage("⚠️ This word has already been used!");
      setGameStatus("fail");
      setTimeout(() => setGameStatus(null), 5000);
      return;
    }
  
    if (match && userInput.startsWith(lastLetter)) {
        const updatedUsedWords = [...usedWords, userInput];
      
        setMessage("😏 Success!");
        setGameStatus("success");
        setHistory((prev) => [...prev, { word: userInput, source: "user" }]);
        setLastCorrectWord(userInput); // ✅ 이 라인을 추가하세요
        
        // 슬래시 효과 표시
        setShowSlashEffect(true);
        setTimeout(() => setShowSlashEffect(false), 1500);
      
        // 정답 시 HP 5 감소
        setScore(prev => {
          if (hpInfinite) return prev;
          const newScore = Math.max(LOSE_SCORE, prev - 5);
          if (newScore <= LOSE_SCORE) {
            setMessage("💀 HP 0! The Reaper wins! Game Over.");
            setGameStatus("lose");
          }
          return newScore;
        });
      
        // 시스템 다음 단어
        const possibleNextWords = wordList.filter(
          (w) =>
            w.term.startsWith(userInput.slice(-1)) &&
            !updatedUsedWords.includes(w.term)
        );
        if (possibleNextWords.length > 0) {
          const systemNext =
            possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
          setTimeout(() => {
            setSystemWord(systemNext.term);
            setHistory((prev) => [
              ...prev,
              { word: systemNext.term, source: "system" },
            ]);
          }, 500);
        }
      
        setUserInput("");
        setHints([]);
        setTimeout(() => setGameStatus(null), 5000);
      }
       else {
      setMessage("👿 HAHAHAHAHAHA Try again or use a hint...");
      setGameStatus("fail");
      // 오답 시 HP 변화 없음
      setTimeout(() => setGameStatus(null), 5000);
    }
  };
  

  const handleHint = () => {
    if (hintCount >= 3) {
      setMessage("🚫 No hints left!");
      setGameStatus("fail");
      setTimeout(() => setGameStatus(null), 5000);
      return;
    }
    const newHints = getHintWords(lastLetter, usedWords);
    if (newHints.length === 0) {
      setMessage("☠️ No valid words starting with that letter. Grim Reaper brings a new word...");
      setGameStatus("info");
      const newWord = wordList[Math.floor(Math.random() * wordList.length)].term;
      setSystemWord(newWord);
      setHistory(prev => [...prev, { word: newWord, source: "system" }]);
      setHints([]);
      setTimeout(() => setGameStatus(null), 4000);
    } else {
      setHints(newHints);
      setHintCount(hintCount + 1);
      // Update hearts with animation
      const newHearts = [...hearts];
      newHearts[2 - hintCount] = false;
      setHearts(newHearts);
      setScore(prev => {
        if (hpInfinite) return prev;
        const newScore = Math.min(WIN_SCORE, prev + 2); // 힌트 시 2 증가
        if (newScore <= LOSE_SCORE) {
          setMessage("💀 HP 0! The Reaper wins! Game Over.");
          setGameStatus("lose");
        }
        return newScore;
      });
      setTimeout(() => setShowHintModal(true), 1000);
    }
  };

  const handleGiveUp = () => {
    setMessage("💀 You gave up!!!!!!!!! The Reaper wins this round HAHAHAHHAHAHA");
    setGameStatus("fail");
    setUserInput("");
    setHints([]);
    setHintCount(0);
    setHearts([true, true, true]); // Reset hearts
    setScore(prev => {
      if (hpInfinite) return prev;
      const newScore = WIN_SCORE; // 기브업 시 HP 풀로 리셋
      if (newScore <= LOSE_SCORE) {
        setMessage("💀 HP 0! The Reaper wins! Game Over.");
        setGameStatus("lose");
      }
      return newScore;
    });
    const newWord = wordList[Math.floor(Math.random() * wordList.length)].term;
    setSystemWord(newWord);
    setHistory([{ word: newWord, source: "system" }]);
    setTimeout(() => setGameStatus(null), 5000);
  };

  const getMatch = (word) => {
    const match = wordList.find(w => w.term === word);
    return match ? match : "No definition available.";
  };

  // Speech bubble message logic
  const getSpeechBubbleMessage = () => {
    if (gameStatus === "success") return "Nice! You survived... for now.";
    if (gameStatus === "fail" && message.includes("already been used")) return "That word was already used! Try again.";
    if (gameStatus === "fail" && message.includes("HAHAHAHA")) return "HAHAHAHA! Choose another word, mortal.";
    if (gameStatus === "fail" && message.includes("gave up")) return "Giving up so soon? The Reaper wins this round!";
    if (gameStatus === "win") return "You beat me... this time. Play again if you dare!";
    if (gameStatus === "fail" && message.includes("No hints left")) return "No hints left! Face your fate.";
    if (gameStatus === "info" && message.includes("Grim Reaper brings a new word")) return "No valid words! The Reaper brings a new word...";
    return "Let's see what you've got! Type a word to begin.";
  };

  // HP 바와 숫자에 무한대(∞) 표시
  const hpDisplay = hpInfinite ? '∞' : score;
  const hpBarWidth = hpInfinite ? '100%' : `${Math.max(0, Math.min(100, (score / WIN_SCORE) * 100))}%`;

  return (
    <>
    <RuleDialog />
    {/* Only show WordHistory on desktop/tablet */}
    {!isMobile && <WordHistory history={history} />}
    <div className="w-full min-h-screen bg-gray-900 py-10 flex flex-col justify-between overflow-x-hidden">
      {/* Top Row: Grim Reaper + Speech Bubble */}
      <div className="flex justify-center items-start mb-2 relative w-full" style={{minHeight: '140px'}}>
        <div className="relative">
          <img 
            src="/reaper_pixels.png" 
            alt="Grim Reaper" 
            className={`h-32 w-auto pixel-shadow transition-all duration-300 ${gameStatus === 'success' ? 'reaper-hurt' : ''}`} 
          />
          {/* 슬래시 효과 */}
          {showSlashEffect && (
            <>
              <img 
                src="/slash_right.png" 
                alt="Slash 1" 
                className="absolute top-0 left-0 w-full h-full object-contain slash-anim-1 pointer-events-none z-10"
                style={{transform: 'scale(1.2)'}}
              />
              <img 
                src="/slash_left.png" 
                alt="Slash 2" 
                className="absolute top-0 left-0 w-full h-full object-contain slash-anim-2 pointer-events-none z-10"
                style={{transform: 'scale(1.2)'}}
              />
            </>
          )}
        </div>
        <div className="ml-4 mt-2 relative flex items-start" style={{zIndex:2, maxWidth: '70vw'}}>
          <div className="pixel-speech-bubble px-6 py-4 font-bold pixelify-sans text-white text-lg" style={{wordBreak: 'break-word', whiteSpace: 'pre-line', maxWidth: '420px', minWidth: '180px'}}>
            {getSpeechBubbleMessage()}
            <div className="pixel-speech-tail" />
          </div>
        </div>
      </div>
      {/* Middle Row: Word & Definition Box */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Reaper HP Bar and Hearts Row */}
        <div className="flex flex-row items-center justify-between w-full max-w-2xl mb-4 px-2 relative" style={{minHeight: 40}}>
          {/* HP Bar (left) */}
          <div className="flex flex-col items-start">
            <span className="pixelify-sans text-white text-sm mb-1 tracking-widest" style={{letterSpacing: '0.1em'}}>REAPER HP</span>
            <div className="reaper-hp-bar-outer">
              <div className="reaper-hp-bar-inner" style={{width: hpBarWidth}} />
            </div>
            <span className="pixelify-sans text-white text-xs mt-1">{hpDisplay} / {WIN_SCORE}</span>
          </div>
          {/* Hearts (right) */}
          <div className="flex flex-row gap-2 items-center absolute right-0 top-0 sm:static sm:ml-auto">
            {hearts.map((isAlive, index) => (
              <img
                key={index}
                src="/red_heart.png"
                alt="Heart"
                className={`h-8 w-8 transition-all duration-1000 ${!isAlive ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                style={{ animation: !isAlive ? 'heartDisappear 1s ease-out' : '' }}
              />
            ))}
          </div>
        </div>
        <div className="pixel-box px-10 py-8 mb-8 max-w-2xl w-full" style={{position: 'relative'}}>
          <div className="text-2xl pixelify-sans text-white mb-2 text-center">
            Grim Reaper's Word: <span className="text-red-500 jersey-25 text-3xl">{systemWord}</span>
          </div>
          {getMatch(systemWord).ipa && (
            <div className="text-md text-gray-300 italic mb-2 text-center">
              <span className="font-semibold">IPA:</span>
              <span className="jersey-25 text-xl"> [{getMatch(systemWord).ipa}]</span>
            </div>
          )}
          <div className="text-md text-gray-200 mb-2 leading-relaxed whitespace-pre-line text-center">
            <span className="font-semibold italic">Definition & Examples:</span> <span className="jersey-25 text-xl"> {getMatch(systemWord).definition}</span>
          </div>
          {getMatch(systemWord).synonyms && (
            <div className="text-md text-gray-300 mb-2 text-center">
              <span className="font-semibold">Synonyms:</span> <span className="jersey-25 text-xl"> {getMatch(systemWord).synonyms}</span>
            </div>
          )}
          {getMatch(systemWord).antonyms && (
            <div className="text-md text-gray-300 mb-2 text-center">
                <span className="font-semibold">Antonyms:</span> <span className="jersey-25 text-lg"> {getMatch(systemWord).antonyms}</span>
              </div>
          )}
          <div className="text-xl mt-6 font-medium text-gray-200 text-center">
            Now, you should start with <span className="text-red-700 font-bold jersey-25 text-2xl">'{lastLetter}'</span>!
          </div>
        </div>
      </div>

      {/* Bottom Row: Orange Action Bar */}
      <div className="w-full flex flex-col items-center mt-4">
        <div className="pixel-action-bar flex flex-col sm:flex-row items-center justify-center gap-3 px-6 py-4 mb-2 w-full">
          <div className="w-full sm:w-auto mb-3 sm:mb-0 flex justify-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter your word..."
              className="jersey-25 pixel-input flex-1 px-4 py-2 text-lg bg-black text-orange-200 border-4 border-orange-400 rounded-none outline-none focus:border-orange-500 transition-all max-w-xs w-full"
              style={{ minWidth: 0, maxWidth: 260 }}
            />
          </div>
          <div className="flex flex-row gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={handleSubmit}
              className="pixel-btn-orange"
            >
              Submit
            </button>
            <button
              onClick={handleHint}
              disabled={hintCount >= 3}
              className={`pixel-btn-orange ${hintCount >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Hint ({3 - hintCount})
            </button>
            <button
              onClick={handleGiveUp}
              className="pixel-btn-orange"
            >
              Give Up
            </button>
          </div>
        </div>
      </div>

      {/* HintList as modal */}
      <HintList hints={hints} lastLetter={lastLetter} open={showHintModal} onClose={() => setShowHintModal(false)} />

      {/* 패배 모달 */}
      {showLoseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          {/* 애니메이션 배경 레이어 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="reaper-lose-bg-anim" />
          </div>
          <div className="bg-gray-900 border-4 border-white rounded-xl p-8 max-w-lg w-full flex flex-col items-center relative z-10">
            <img src="/grim_reaper_lose.png" alt="Grim Reaper Lose" className="w-48 h-auto mb-4" />
            <h2 className="text-3xl font-bold text-orange-400 mb-2 pixelify-sans">You win!</h2>
            <p className="text-white text-lg mt-2 mb-6 text-center jersey-25">
              The Grim Reaper's avatar has perished, <br/> but its shadow lingers...<br/>
              Would you like to keep fighting in simulation mode? <br/>
              <span className="text-orange-300">Word history will remain, but HP mode is now disabled.</span><br/>
              (HP will show ∞ and will not decrease anymore)
            </p>
            <div className="flex gap-6 mt-2">
              <button
                className="px-6 py-2 bg-orange-500 text-white font-bold rounded pixelify-sans border-2 border-white hover:bg-orange-600 transition"
                onClick={() => {
                  setHpInfinite(true);
                  setShowLoseModal(false);
                  setScore(Infinity);
                }}
              >
                Yes, keep fighting!
              </button>
              <button
                className="px-6 py-2 bg-gray-700 text-white font-bold rounded pixelify-sans border-2 border-white hover:bg-gray-800 transition"
                onClick={() => {
                  setHpInfinite(false);
                  setShowLoseModal(false);
                  setScore(WIN_SCORE);
                  setHistory([{ word: wordList[Math.floor(Math.random() * wordList.length)].term, source: "system" }]);
                  setMessage("");
                  setHintCount(0);
                  setHearts([true, true, true]);
                  setHints([]);
                  setUserInput("");
                }}
              >
                No, reset game
              </button>
            </div>
          </div>
          <style jsx>{`
            .reaper-lose-bg-anim {
              position: absolute;
              bottom: -40%;
              left: 0;
              width: 100%;
              height: 140%;
              background: linear-gradient(0deg, rgba(255,60,0,0.7) 0%, rgba(255,255,255,0.2) 60%, transparent 100%);
              animation: rise 2.2s cubic-bezier(0.4,0,0.2,1) forwards;
              z-index: 1;
            }
            @keyframes rise {
              0% { bottom: -40%; }
              100% { bottom: 0%; }
            }
          `}</style>
        </div>
      )}

      <style jsx>{`
        .pixel-speech-bubble {
          position: relative;
          background: #222;
          border: 1.5px solid #fff;
          box-shadow: none;
          border-radius: 0;
          font-family: 'Pixelify Sans', 'VT323', monospace;
          font-size: 1.1rem;
          color: #fff;
          display: block;
        }
        .pixel-speech-tail {
          position: absolute;
          left: -22px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
          border-right: 18px solid #fff;
          z-index: 1;
        }
        .pixel-speech-bubble::after {
          content: '';
          position: absolute;
          left: -14px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 14px solid transparent;
          border-bottom: 14px solid transparent;
          border-right: 14px solid #222;
          z-index: 2;
        }
        .pixel-box {
          border: 6px solid white;
          box-shadow: 0 0 0 4px #222, 0 0 0 8px #fff, 0 0 0 12px #222;
          border-radius: 0.5rem;
          background: #181818;
          font-family: 'Pixelify Sans', 'VT323', monospace;
        }
        .pixel-action-bar {
          background: #ff9800;
          border: 4px solid #fff3e0;
          box-shadow: 0 0 0 4px #b45309, 0 0 0 8px #fff3e0;
          border-radius: 0.5rem;
        }
        .pixel-btn-orange {
          background: #ff9800;
          color: #222;
          border: 3px solid #fff3e0;
          font-family: 'Pixelify Sans', 'VT323', monospace;
          font-size: 1.1rem;
          padding: 0.5rem 1.2rem;
          margin: 0 0.2rem;
          border-radius: 0.25rem;
          box-shadow: 0 2px #b45309;
          transition: background 0.2s, color 0.2s;
        }
        .pixel-btn-orange:hover:not(:disabled) {
          background: #ffa726;
          color: #000;
        }
        .pixel-input {
          border-radius: 0.25rem;
          font-family: 'Pixelify Sans', 'VT323', monospace;
        }
        .pixel-shadow {
          filter: drop-shadow(0 0 12px #fff) drop-shadow(0 0 4px #fff);
        }
        .reaper-hp-bar-outer {
          width: 320px;
          height: 22px;
          background: #181818;
          border: 2.5px solid #fff;
          box-shadow: 0 0 0 2px #222;
          border-radius: 0;
          overflow: hidden;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
        }
        .reaper-hp-bar-inner {
          height: 100%;
          background: linear-gradient(90deg, #ff9800 60%, #ff3c00 100%);
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
      <style jsx>{`
        @keyframes heartDisappear {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          10% {
            transform: translateX(-8px) scale(1.05);
          }
          20% {
            transform: translateX(8px) scale(1.05);
          }
          30% {
            transform: translateX(-6px) scale(1.05);
          }
          40% {
            transform: translateX(6px) scale(1.05);
          }
          50% {
            transform: translateX(-4px) scale(1.05);
          }
          60% {
            transform: translateX(4px) scale(1.05);
          }
          70% {
            transform: translateX(-2px) scale(1.05);
          }
          80% {
            transform: translateX(2px) scale(1.05);
            opacity: 0.7;
          }
          90% {
            transform: translateX(0) scale(1.2);
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateX(0) scale(0);
          }
        }
        .reaper-hurt {
          animation: reaperHurt 1.5s ease-out;
        }
        @keyframes reaperHurt {
          0% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-8px) rotate(-3deg); }
          20% { transform: translateX(12px) rotate(4deg); }
          30% { transform: translateX(-10px) rotate(-3deg); }
          40% { transform: translateX(8px) rotate(2deg); }
          50% { transform: translateX(-6px) rotate(-2deg); }
          60% { transform: translateX(4px) rotate(1deg); }
          70% { transform: translateX(-3px) rotate(-1deg); }
          80% { transform: translateX(2px) rotate(0.5deg); }
          90% { transform: translateX(-1px) rotate(-0.5deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        .slash-anim-1 {
          animation: slashEffect1 1.5s ease-out;
        }
        .slash-anim-2 {
          animation: slashEffect2 1.5s ease-out 0.2s;
        }
        @keyframes slashEffect1 {
          0% { 
            opacity: 0; 
            transform: scale(0.8) translateX(-30px) translateY(-20px) rotate(-15deg);
          }
          15% { 
            opacity: 1; 
            transform: scale(1.2) translateX(30px) translateY(20px) rotate(15deg);
          }
          30% { 
            opacity: 0.8; 
            transform: scale(1.3) translateX(50px) translateY(30px) rotate(20deg);
          }
          100% { 
            opacity: 0; 
            transform: scale(1.5) translateX(80px) translateY(50px) rotate(25deg);
          }
        }
        @keyframes slashEffect2 {
          0% { 
            opacity: 0; 
            transform: scale(0.8) translateX(30px) translateY(-30px) rotate(25deg);
          }
          15% { 
            opacity: 1; 
            transform: scale(1.2) translateX(-30px) translateY(30px) rotate(-25deg);
          }
          30% { 
            opacity: 0.8; 
            transform: scale(1.3) translateX(-50px) translateY(40px) rotate(-30deg);
          }
          100% { 
            opacity: 0; 
            transform: scale(1.5) translateX(-80px) translateY(60px) rotate(-35deg);
          }
        }
      `}</style>
    </div>
    </>
  );
}