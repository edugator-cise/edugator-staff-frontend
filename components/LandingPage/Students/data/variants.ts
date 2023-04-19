export const variants = {
  intellisense: {
    containerVariants: {
      initial: {
        x: "50%",
        opacity: 0,
        transition: {
          duration: 0.5,
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      },
      animate: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          //spring ease
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      },
    },
    suggestionVariants: (delay: number) => ({
      initial: {
        opacity: 0,
        y: `0.25em`,
      },
      animate: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      },
    }),
    characterVariants: (delay: number) => ({
      initial: {
        opacity: 0,
        y: `0.25em`,
      },
      animate: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      },
    }),
  },
  mobileFriendly: {
    containerVariants: {
      initial: {
        width: "90%",
        transition: {
          duration: 0.5,
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      },
      animate: {
        width: "30%",
        transition: {
          duration: 0.5,
          //spring ease
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      },
    },
  },
};
