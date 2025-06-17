import React from "react";

export default function WordHistory({ history }) {
  return (
    <div className="w-64 bg-gray-800/50 rounded-lg p-4 border border-[#ffb300]">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Word History</h2>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              item.source === "system"
                ? "bg-[#ff9800]/30 text-[#ff9800]"
                : "bg-blue-900/30 text-blue-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">
                {item.source === "system" ? "🪦 Reaper said:" : "👤 You said:"}
              </span>
              <span className="font-medium">{item.word}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
