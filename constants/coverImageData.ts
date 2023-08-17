// migrate these image entries to S3 links once we store them in buckets

interface CoverImageData {
  title: string;
  images: string[];
}

export const placeholderAvatar =
  "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg";

export const coverImageColors = [
  "#1cb0f6",
  "#ff4b4b",
  "#ffc800",
  "#ff9600",
  "#ce82ff",
  "#2b70c9",
  "#78C93D",
  "#9EE04A",
];

export const coverImageData: CoverImageData[] = [
  {
    title: "Energy",
    images: [
      "energy/Energy1.jpeg",
      "energy/Energy2.jpeg",
      "energy/Energy3.jpeg",
      "energy/Energy4.jpeg",
      "energy/Energy5.jpeg",
    ],
  },
  {
    title: "Sunset",
    images: [
      "sunset/Sunset1.jpeg",
      "sunset/Sunset2.jpeg",
      "sunset/Sunset3.jpeg",
      "sunset/Sunset4.jpeg",
      "sunset/Sunset5.jpeg",
    ],
  },
  {
    title: "Midnight",
    images: [
      "midnight/Midnight1.jpeg",
      "midnight/Midnight2.jpeg",
      "midnight/Midnight3.jpeg",
      "midnight/Midnight4.jpeg",
      "midnight/Midnight5.jpeg",
    ],
  },
];
