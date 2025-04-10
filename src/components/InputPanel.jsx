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
    <div className="text-center">
      <Input
        placeholder="Type your word..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value.trim().toLowerCase())}
        onKeyPress={handleKeyPress} // Add onKeyPress event
      />
      <div className="flex justify-center gap-3 mt-3">
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleHint} variant="outline">Hint!</Button>
        <Button onClick={handleGiveUp} variant="destructive">Give Up</Button>
      </div>
    </div>
  );
}
