import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Algorithms", "C++", "Trees", "Sets", "Maps"];

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
    <span className="text-emerald-500">
      <TextTransition delay={2000} inline text={TEXTS[index % TEXTS.length]} />
    </span>
  );
};

export default RotatingText;
