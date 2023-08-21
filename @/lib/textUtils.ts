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

export const camelCaseToSpacedTitleCase = (str: string) => {
  // Split the string into an array of words
  const words = str.split(/(?=[A-Z])/);

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );

  // Join the words back together
  return capitalizedWords.join(" ");
};

const urlRegex =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

export const isUrl = (str: string) => {
  return str.match(urlRegex);
};
