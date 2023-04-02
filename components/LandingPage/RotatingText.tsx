import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Algorithms", "Arrays", "Methods", "Python", "Two Sum"];

const RotatingText = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <TextTransition delay={2000} inline>
      <span
        //GRADIENT TEXT
        className="bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-emerald-400"
      >
        {TEXTS[index % TEXTS.length]}
      </span>
    </TextTransition>
  );
};

export default RotatingText;
