import { useState, useEffect } from "react";

// Debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default function useWindowWidth() {
  function getWidth() {
    return window.innerWidth;
  }

  if (typeof window === "undefined" || !window) return;

  const [windowWidth, setWindowWidth] = useState(getWidth);

  useEffect(() => {
    // Debounce to avoid the function fire multiple times
    const handleResizeDebounced = debounce(
      () => {
        setWindowWidth(getWidth());
      },
      10,
      false
    );

    window.addEventListener("resize", handleResizeDebounced);
    return () => window.removeEventListener("resize", handleResizeDebounced);
  }, []);

  return windowWidth;
}
