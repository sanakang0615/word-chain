import React from "react";

export function Input(props) {
  return (
    <input
      {...props}
      className={`border border-gray-400 px-3 py-2 rounded w-full text-center text-lg ${props.className || ""}`}
    />
  );
}
