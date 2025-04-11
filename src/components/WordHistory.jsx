import React from "react";

export default function WordHistory({ history }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold my-4">Word History</h2>
      <ul role="list" className="space-y-4 relative">
        {history.map((entry, idx) => (
          <li key={idx} className="relative flex gap-x-4">
            {/* Vertical line */}
            <div
              className={`absolute left-3 top-0 h-full w-px ${idx === history.length - 1 ? 'bg-transparent' : 'bg-gray-200'}`}
              aria-hidden="true"
            />

            {/* Dot icon */}
            <div className={`relative mt-1.5 h-2.5 w-2.5 flex-none rounded-full ${entry.source === 'system' ? 'bg-gray-400' : 'bg-blue-400'} ring-2 ring-white`} />

            {/* Word content */}
            <p className="flex-auto py-0.5 text-sm text-gray-700">
              <span className="align-middle font-medium text-gray-900 inline-flex items-center">
                {entry.source === 'system' ? (
                  <>
                    <img src="/scythe.png" alt="Scythe" className="h-4 w-4 mr-1 inline-block" />
                    grim reaper
                  </>
                ) : (
                  <>
                    <img src="/shadow.png" alt="shadow" className="h-4 w-4 mr-1 inline-block" />
                    you
                  </>
                )}
              </span>
              <span className="ml-1 align-middle">said <span className="text-blue-600">{entry.word}</span></span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
