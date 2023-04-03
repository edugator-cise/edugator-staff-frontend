const authoringItemTransitionValues = [
  // x start, x end, y start, y end, delay
  ["-100%", "-360%", 40, -20, 0.1],
  ["-50%", "-215%", 40, -45, 0.05],
  ["-50%", "-50%", 40, -50, 0.1],
  ["-50%", "115%", 40, -45, 0.05],
  ["0%", "260%", 40, -20, 0.15],
];

export const variants = {
  authoringTools: {
    containerVariants: {
      initial: {
        y: 5,
      },
      animate: {
        y: 70,
        transition: {
          duration: 0.3,
        },
      },
    },
    itemVariants: (index: number) => ({
      initial: {
        opacity: 0,
        x: authoringItemTransitionValues[index][0],
        y: authoringItemTransitionValues[index][2],
        transition: {
          duration: 0.3,
          delay: 0,
        },
      },
      animate: {
        opacity: 1,
        x: authoringItemTransitionValues[index][1],
        y: authoringItemTransitionValues[index][3],
        transition: {
          duration: 0.3,
          delay: authoringItemTransitionValues[index][4],
        },
      },
    }),
  },
  manageTeam: {
    listItemVariants: {
      initial: {
        opacity: 0,
        y: 20,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: {
          duration: 0.3,
        },
      },
    },
    addButtonVariants: {
      initial: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          delay: 0.4,
        },
      },
      animate: {
        opacity: 0,
        y: 20,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: {},
      },
    },
  },
};
