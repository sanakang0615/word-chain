import React from "react";
import { Button } from "./ui/Button";

export default function ScorePanel({ score, hintLeft, onGiveUp }) {
  return (
    <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-yellow-300/80">
      <div className="flex justify-between items-center">
        <div className="text-gray-200">
          <span className="text-yellow-500 font-bold">Score: {score}</span>
          <span className="ml-4 text-blue-700">Hints left: {hintLeft}</span>
        </div>
        <button
          onClick={onGiveUp}
          className="px-4 py-2 bg-yellow-200/30 text-yellow-700 rounded-lg hover:bg-yellow-100/60 transition-colors"
        >
          Give Up
        </button>
      </div>
    </div>
  );
}
