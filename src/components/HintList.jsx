import React from "react";

export default function HintList({ hints, lastLetter }) {
  if (hints.length === 0) return null;
  return (
    <div className="mt-4 text-sm">
      <p className="font-medium mb-1">💡 Hints starting with '{lastLetter}':</p>
      <ul className="list-disc list-inside">
        {hints.map((h, idx) => (
          <li key={idx}>
            <strong>{h.term}</strong>: {h.definition}
          </li>
        ))}
      </ul>
    </div>
  );
}
