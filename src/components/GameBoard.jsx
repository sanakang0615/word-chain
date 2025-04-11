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

export default function GameBoard() {
  const [systemWord, setSystemWord] = useState("");
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [hints, setHints] = useState([]);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(3);
  const [hintCount, setHintCount] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);
  const [lastCorrectWord, setLastCorrectWord] = useState("");
  

  useEffect(() => {
    const randomStart = wordList[Math.floor(Math.random() * wordList.length)].term;
    setSystemWord(randomStart);
    setHistory([{ word: randomStart, source: "system" }]);
  }, []);

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
      
        // 점수 증가 + 승리 체크
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          if (newScore >= 70) {
            setMessage("🎉 You reached 10 points! You win!");
            setGameStatus("win");
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
      setScore(prev => Math.max(0, prev - 0.5));
    }
  };

  const handleGiveUp = () => {
    setMessage("💀 You gave up!!!!!!!!! The Reaper wins this round HAHAHAHHAHAHA");
    setGameStatus("fail");
    setUserInput("");
    setHints([]);
    setHintCount(0);
    setScore(3);
    const newWord = wordList[Math.floor(Math.random() * wordList.length)].term;
    setSystemWord(newWord);
    setHistory([{ word: newWord, source: "system" }]);
    setTimeout(() => setGameStatus(null), 5000);
  };

  const getMatch = (word) => {
    const match = wordList.find(w => w.term === word);
    return match ? match : "No definition available.";
  };

  return (
    <>
    <RuleDialog />
    <div className="max-w-[90vw] min-h-[90vh] mx-auto my-10 bg-[#f5efe6] text-[#2c2c2c] border-[#d2c4ae] font-serif border rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4 border-b pb-2 border-[#cab89f]">
        <div className="text-3xl font-black flex items-center gap-2">
          <span className="tracking-wide font-sixtyfour">Death's Word Chain</span>
          {/* <img src="/grim-reaper.png" alt="Scythe" className="h-12 w-12" style={{ paddingBottom: "5px" }} /> */}
        </div>
        <div className="text-2xl">
           
        </div>
      </div>

      <div className="flex">
        <div className="w-1/3 pr-4">
          <WordHistory history={history} />
        </div>

        <div className="w-2/3 relative">
        <div className="mb-6">
          <p className="text-xl font-bold text-gray-900 my-5">
            <div className="flex items-center">
            <img src="/grim-reaper.png" alt="Scythe" className="h-10 w-10" style={{ paddingBottom: "2px", marginRight: "8px"}} />
            <span >Grim Reaper's Word: <span className="text-red-700">{systemWord}</span></span>
        </div>
          
          </p>

          {getMatch(systemWord).ipa && (
            <p className="text-md text-gray-800 italic mb-2">
              <span className="font-semibold">IPA:</span> [{getMatch(systemWord).ipa}]
            </p>
          )}

          <p className="text-md text-gray-700 mb-2 leading-relaxed whitespace-pre-line">
            <span className="font-semibold italic text-gray-800">Definition & Examples:</span>{" "}
            {getMatch(systemWord).definition}
          </p>


          {getMatch(systemWord).antonym && (
            <p className="text-md text-gray-700 mb-2 leading-relaxed">
              <span className="font-semibold text-gray-800">Synonyms:</span> {getMatch(systemWord).antonym}
            </p>
          )}

          {getMatch(systemWord).antonyms && (
            <p className="text-md text-gray-700 mb-2 leading-relaxed">
              <span className="font-semibold text-gray-800">Antonyms:</span> {getMatch(systemWord).antonyms}
            </p>
          )}

          <p className="text-lg mt-8 font-medium text-gray-900">
            Now, you should start with <span className="text-blue-700 font-bold">'{lastLetter}'</span>!
          </p>
        </div>


          <InputPanel
            userInput={userInput}
            setUserInput={setUserInput}
            handleSubmit={handleSubmit}
            handleHint={handleHint}
            handleGiveUp={handleGiveUp}
            hintLeft={3 - hintCount}
          />

          {gameStatus === "success" && (
            <div className="rounded-md bg-green-50 p-4 mt-4">
              <div className="flex">
                <div className="shrink-0">
                  <CheckCircleIcon className="size-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Successfully matched the word: <span className="font-semibold">{lastCorrectWord}</span>
                  </p>
                  <p className="mt-1 text-sm text-green-700 italic">
                    Definition: {getMatch(lastCorrectWord).definition}
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setGameStatus(null)}
                    className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {gameStatus === "fail" && (
            <div className="rounded-md bg-red-50 p-4 mt-4">
              <div className="flex">
                <div className="shrink-0">
                  <XCircleIcon className="size-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{message}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setGameStatus(null)}
                    className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {gameStatus === "info" && (
            <div className="rounded-md bg-yellow-50 p-4 mt-4">
              <div className="flex">
                <div className="shrink-0">
                  <CheckCircleIcon className="size-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">{message}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setGameStatus(null)}
                    className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {gameStatus === "win" && (
  <div className="rounded-md bg-green-100 p-4 mt-4 border border-green-300">
    <div className="flex items-center">
      <CheckCircleIcon className="size-5 text-green-600 mr-2" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-sm font-bold text-green-800">
          🎊 Congratulations! You reached 10 points and defeated the Reaper!
        </p>
        <p className="text-sm italic text-green-700 mt-1">
          Try again if you dare... 🔁
        </p>
      </div>
      <button
        onClick={() => {
          setGameStatus(null);
          setScore(3);
          setHintCount(0);
          const newWord = wordList[Math.floor(Math.random() * wordList.length)].term;
          setSystemWord(newWord);
          setHistory([{ word: newWord, source: "system" }]);
        }}
        className="ml-4 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-green-700 hover:bg-green-200 shadow-sm"
      >
        Restart
      </button>
    </div>
  </div>
)}


          <HintList hints={hints} lastLetter={lastLetter} />
          <ScorePanel score={score} hintLeft={3 - hintCount} onGiveUp={handleGiveUp} />
        </div>
      </div>
    </div>
    </>
  );
}