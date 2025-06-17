import React from "react";

export default function HintList({ hints, lastLetter }) {
  if (hints.length === 0) return null;

  return (
    <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-[#ffb300]">
      <h3 className="text-lg font-semibold mb-3 text-gray-200">
        Hints for words starting with <span className="text-[#ff9800]">'{lastLetter}'</span>:
      </h3>
      <div className="space-y-2">
        {hints.map((hint, index) => (
          <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
            <p className="text-blue-300 font-medium">{hint.term}</p>
            <p className="text-gray-400 text-sm mt-1">{hint.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
