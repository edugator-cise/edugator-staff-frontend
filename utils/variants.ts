// framer variant exports
import { Variants } from "framer-motion";

//landing page variants
export const heroImageVariants: (
  delay: number,
  side: "left" | "right" | "center"
) => Variants = (delay: number, side: "left" | "right" | "center") => {
  let x = {
    start: "-50%",
    end: "50%",
  };

  if (side === "left") {
    x.start = "-40%";
    x.end = "-50%";
  } else if (side === "right") {
    x.start = "40%";
    x.end = "50%";
  } else if (side === "center") {
    x.start = "-50%";
    x.end = "-50%";
  }

  return {
    hidden: {
      opacity: 0,
      y: 100,
      x: x.start,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: x.end,
      transition: {
        delay: delay,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
};
