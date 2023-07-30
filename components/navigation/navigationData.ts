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
  href?: string;
};

export type NavLinkText =
  | "Dashboard"
  | "View All"
  | "Lessons"
  | "Problems"
  | "Bug Bounty";

export type AdminNavLinkText =
  | "Course Content"
  | "Blank"
  | "Course Roster"
  | "Course Home"
  | "Home"
  | "Roster";

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
    icon: icons.dashboard2,
    text: "Home",
    id: "home",
    toggleExercises: false,
    href: "/",
  },
  {
    icon: icons.book,
    text: "Course Content",
    id: "content",
    toggleExercises: true,
    href: "/content",
  },
  {
    icon: icons.usersMultiple,
    text: "Roster",
    id: "roster",
    toggleExercises: false,
    href: "/roster",
  },
];
