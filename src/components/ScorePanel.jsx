import React from "react";
import { Button } from "./ui/Button";

export default function ScorePanel({ score, hintLeft, onGiveUp }) {
  return (
    <div className="flex flex-wrap justify-between items-end mt-6 gap-4">
      <div className="flex-1 min-w-[120px] bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h2 className="text-3xl font-jacquard mb-1 text-center border-b pb-1">Score</h2>
        <p className="text-5xl font-jacquard text-center text-red-600">{score.toFixed(1)}</p>
      </div>

      <div className="flex-1 min-w-[120px] bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h2 className="text-3xl mb-1 text-center border-b pb-1 font-jacquard">Hints Left</h2>
        <p className="text-5xl font-jacquard text-center text-blue-600">{hintLeft}</p>
      </div>

      {/* <div className="self-center">
        <Button onClick={onGiveUp} variant="destructive">Concede</Button>
      </div> */}
    </div>
  );
}
