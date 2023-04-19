export const toTitleCase = (str: string) => {
  // Split the string into an array of words
  const words = str.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );

  // Join the words back together
  return capitalizedWords.join(" ");
};
