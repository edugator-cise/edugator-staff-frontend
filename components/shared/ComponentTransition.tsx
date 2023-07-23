import React from "react";
import { motion as m } from "framer-motion";

// wrapping a component in this will make it animate up when a page transition occurs

const ComponentTransition = ({ children }: { children: React.ReactNode }) => {
  const upAnimation = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    enter: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
  };

  return (
    <m.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={upAnimation}
      transition={{ type: "linear", duration: 0.4 }}
      className="flex h-auto w-full flex-col items-center justify-center"
    >
      {children}
    </m.main>
  );
};

export default ComponentTransition;
