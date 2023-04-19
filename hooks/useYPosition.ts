import { useState, useEffect } from "react";

const useYPosition = (id: string): number | null => {
  const [yPosition, setYPosition] = useState<number | null>(null);

  useEffect(() => {
    const element = document.getElementById(id);

    if (document && element) {
      setYPosition(element.getBoundingClientRect().top + window.pageYOffset);
    }
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      const element = document.getElementById(id);

      if (document && element) {
        setYPosition(element.getBoundingClientRect().top + window.pageYOffset);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  useEffect(() => {
    const handleLoad = () => {
      const element = document.getElementById(id);

      if (document && element) {
        setYPosition(element.getBoundingClientRect().top + window.pageYOffset);
      }
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [id]);

  return yPosition;
};

export default useYPosition;
