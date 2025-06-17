import React from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export default function InputPanel({ userInput, setUserInput, handleSubmit, handleHint, handleGiveUp, hintLeft }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-yellow-300/80">
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Enter your word..."
          className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-yellow-200/30 text-yellow-700 rounded-lg hover:bg-yellow-100/60 transition-colors"
        >
          Submit
        </button>
        <button
          onClick={handleHint}
          disabled={hintLeft === 0}
          className={`px-4 py-2 rounded-lg transition-colors ${
            hintLeft === 0
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-blue-900/30 text-blue-300 hover:bg-blue-800/30"
          }`}
        >
          Hint ({hintLeft})
        </button>
      </div>
    </div>
  );
}
