import React from "react";

export default function HintList({ hints, lastLetter }) {
  if (hints.length === 0) return null;

  return (
    <div className="overflow-hidden mt-6 p-8 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="text-2xl flex items-center gap-2 mb-4">
        <img src="/witch.png" alt="Hint" className="h-8" style={{ paddingBottom: "3px" }} />
        <span className="tracking-wide font-jacquard font-normal">
          Hints starting with <span className="text-blue-600">'{lastLetter}'</span>:
        </span>
      </div>

      <ul className="space-y-4">
        {hints.map((h, idx) => {
          const [meaning, example] = h.definition.split(" - ");

          return (
            <li key={idx}>
              <p className="text-base font-semibold text-gray-800" style={{"paddingLeft": "4px"}}>· {h.term}</p>
              <p className="text-sm text-gray-700" style={{"paddingLeft": "5px"}}>{meaning}</p>
              {example && (
                <p className="text-sm italic text-gray-500 mt-1">– {example}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
