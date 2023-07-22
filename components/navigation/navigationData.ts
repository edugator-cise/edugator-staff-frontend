import { icons } from "./navIcons";

export const classes = [
  {
    name: "COP3530",
    course: "Data Structures and Algorithms",
    icon: "/DSALogo.png",
  },
  {
    name: "COP3501",
    course: "Programming 1",
    icon: "/prog1logo.jpg",
  },
];

export type NavLinkItem = {
  icon: (active: boolean) => React.ReactNode;
  text: NavLinkText | AdminNavLinkText;
  id: string;
  toggleExercises?: boolean;
};

export type NavLinkText =
  | "Dashboard"
  | "View All"
  | "Lessons"
  | "Problems"
  | "Bug Bounty";

export type AdminNavLinkText = "Course Content" | "Blank";

export const navLinks: NavLinkItem[] = [
  {
    icon: icons.dashboard,
    text: "Dashboard",
    id: "dashboard",
  },
  {
    icon: icons.list,
    text: "View All",
    id: "all",
    toggleExercises: true,
  },
  {
    icon: icons.books,
    text: "Lessons",
    id: "lessons",
    toggleExercises: true,
  },
  {
    icon: icons.monitorCode,
    text: "Problems",
    id: "problems",
    toggleExercises: true,
  },
  /* {
    icon: icons.bug,
    text: "Bug Bounty",
    id: "bugbounty",
  }, */
];

export const adminNavLinks: NavLinkItem[] = [
  {
    icon: icons.list,
    text: "Course Content",
    id: "dashboard",
    toggleExercises: true,
  },
  {
    icon: icons.bug,
    text: "Blank",
    id: "blank",
    toggleExercises: false,
  },
];
