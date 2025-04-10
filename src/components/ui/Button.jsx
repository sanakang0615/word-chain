import React from "react";

export function Button({ children, onClick, variant = "default" }) {
  const base = "px-4 py-2 rounded font-semibold transition";
  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-black text-black hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
