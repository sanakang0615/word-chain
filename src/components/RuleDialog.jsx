'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function RuleDialog() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-[#fdfaf4] p-6 text-left align-middle shadow-2xl border border-gray-200 transition-all duration-700 animate-fadeInUp">

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <img src="/grim-reaper.png" alt="Scythe" className="h-12 w-12" style={{ paddingBottom: "5px" }} />
              </div>
              <div className="text-gray-800">
                <DialogTitle
                  as="h3"
                  className="text-4xl text-gray-900 font-jacquard tracking-wider"
                >
                  Death’s Word Chain
                </DialogTitle>
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <p>You are being chased by the Grim Reaper...</p>
                  <p>To escape death, you must play a word chain using GRE vocabulary. (거만어) </p>
                  <ul className="list-disc pl-5">
                    <li>Start each word with the last letter of the previous word.</li>
                    <li>You only get <strong>3 hints</strong>. Each costs <strong>0.5 points</strong>.</li>
                    <li>Each correct answer gives you <strong>+1 point</strong>.</li>
                    <li>Earn <strong>10 points</strong> to defeat the Reaper!</li>
                  </ul>
                  <p className="mt-2 italic text-red-500 text-2xl font-jacquard">Are you ready..?</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                Let’s Begin
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
