import { useState, useEffect, RefObject } from "react";

type UseIsInViewOptions = {
  ref: RefObject<HTMLElement>;
  margin?: string;
};

function useIsInView(options: UseIsInViewOptions): boolean {
  const { ref, margin = "0px" } = options;
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: margin,
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, margin]);

  return isInView;
}

export default useIsInView;
