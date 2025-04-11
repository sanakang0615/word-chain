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
        <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#fefcf9] p-8 text-left align-middle shadow-2xl ring-1 ring-gray-200 transition-all duration-700 animate-fadeInUp">

<div className="flex items-start gap-6">
  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
    <img src="/grim-reaper.png" alt="Scythe" className="h-10 w-10" />
  </div>
  <div className="text-gray-800">
    <DialogTitle
      as="h3"
      className="text-4xl text-gray-900 font-jacquard tracking-wider mb-2"
    >
      Death’s Word Chain
    </DialogTitle>

    <div className="italic font-serif  text-md leading-relaxed space-y-2 text-gray-800 mt-8">
      <p>You are being chased by the Grim Reaper...</p>
      <p style={{marginBottom: "18px"}}>To escape death, you must play a word chain using GRE vocabulary.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Start each word with the last letter of the previous word.</li>
        <li>You only get 3 hints. Each costs 0.5 points.</li>
        <li>Each correct answer gives you +1 point.</li>
        <li>Earn 10 points to defeat the Reaper!</li>
      </ul>
      <p className=" text-red-600 text-3xl italic font-jacquard" style={{marginTop: "28px"}}>
        Are you ready..?
      </p>
    </div>
  </div>
</div>

<div className="mt-8 flex justify-end">
  <button
    type="button"
    onClick={() => setOpen(false)}
    className="font-jacquard inline-flex justify-center rounded-full bg-black px-5 py-2 text-xl font-semibold text-white shadow-md hover:bg-gray-800 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
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
