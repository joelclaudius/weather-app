import React, { useState, useEffect } from "react";
import "./TypingEffect.css"; // We'll create this CSS file next

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (index < text.length && !pause) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
        if (text[index] === "." || text[index] === "!") {
          setPause(true);
          setTimeout(() => setPause(false), 500); // Pause for 500ms at end of sentences
        }
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed, pause]);

  return (
    <span className="typing-effect italic ">
      {displayedText}
      <span className="cursor italic">|</span>
    </span>
  );
};

export default TypingEffect;