import React, { useEffect, useState } from "react";
import { CaretDown } from "phosphor-react";
import AnimateHeight from "react-animate-height";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";

import { icons } from "./navIcons";

const Divider = () => {
  return <div className="w-full h-px bg-slate-300 dark:bg-slate-600"></div>;
};

const ClassSelect = ({ open }: { open: boolean }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`w-full flex hover:bg-zinc-50/5 transition py-1 px-1 items-center justify-start space-x-4 rounded-lg !outline-none`}
          aria-label="Select class"
        >
          <div className="flex items-end justify-between">
            <div
              className={`h-10 w-10 min-w-[2.5rem] rounded-md transition relative ${
                open ? "" : "border-2 border-zinc-400"
              }`}
            >
              <Image
                src="/DSALogo.png"
                layout="fill"
                objectFit="cover"
                className={`transition-all ${
                  open ? "!rounded-md" : "!p-[3px] !rounded-sm"
                }`}
              />
            </div>
          </div>
          <section
            className={`flex h-full w-full item transition-opacity rounded-md flex-col whitespace-nowrap justify-end overflow-hidden text-left leading-none ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="font-bold text-white overflow-hidden text-ellipsis">
              COP3530
            </h1>
            <p className="text-zinc-300 text-sm overflow-hidden text-ellipsis">
              Data Structures and Algorithms
            </p>
          </section>
          <div className="w-4 h-4 mr-1">
            <CaretDown size={18} className={`text-white`} />
          </div>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          side={open ? "bottom" : "right"}
          className="PopoverContent font-dm bg-white p-2 rounded-md shadow-lg z-50 transition-all radix-state-open:opacity-100 opacity-0 origin-radix-popover"
          sideOffset={open ? 10 : 20}
        >
          <div className="flex flex-col space-y-2">
            <button className="flex items-center space-x-3 bg-zinc-100 p-2 rounded-md max-w-[18rem] w-[18rem]">
              <div className="h-10 w-10 min-w-[2.5rem] bg-white rounded-md relative border">
                <Image src="/DSALogo.png" layout="fill" objectFit="contain" />
              </div>
              <section className="flex flex-col whitespace-nowrap overflow-hidden text-left leading-none">
                <h1 className="font-bold text-gray-800 overflow-hidden text-ellipsis">
                  COP3530
                </h1>
                <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
                  Data Structures and Algorithms
                </p>
              </section>
            </button>
            <button className="flex items-center space-x-3 hover:bg-zinc-100 p-2 rounded-md max-w-[18rem] w-[18rem]">
              <div className="h-10 w-10 min-w-[2.5rem] bg-white rounded-md relative border">
                <Image src="/prog1logo.png" layout="fill" objectFit="contain" />
              </div>
              <section className="flex flex-col whitespace-nowrap overflow-hidden text-left leading-none">
                <h1 className="font-bold text-gray-800 overflow-hidden text-ellipsis">
                  COP3501
                </h1>
                <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
                  Programming 1
                </p>
              </section>
            </button>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

type NavLink = {
  icon: (active: boolean) => React.ReactNode;
  text: NavLinkText;
};

const navLinks: NavLink[] = [
  {
    icon: icons.dashboard,
    text: "Dashboard",
  },
  {
    icon: icons.list,
    text: "View All",
  },
  {
    icon: icons.books,
    text: "Lessons",
  },
  {
    icon: icons.monitorCode,
    text: "Problems",
  },
];

const classes = [
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

//type for nav link text
type NavLinkText = "Dashboard" | "View All" | "Lessons" | "Problems";

const SideNavigation = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<NavLinkText>("Dashboard");
  const [activeClass, setActiveClass] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();
  const { pathname } = router;

  console.log(pathname);
  return (
    <nav
      className={`transition-all font-dm overflow-hidden h-full bg-[#111825] flex flex-col items-center justify-start border-r border-r-slate-700 ${
        open ? "min-w-[18rem] w-[18rem]" : "w-[4.5rem] min-w-[4.5rem]"
      }`}
    >
      {/* Top Group */}

      {/* Logo */}
      <div className="flex items-center h-16 w-full bg-gradient-to-tl from-[#111825] via-[#111825] to-emerald-900/40 px-3">
        <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center mr-2">
          <svg
            className="w-full"
            viewBox="0 0 25 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.8916 3.0121C16.7165 3.18782 16.6403 3.39508 16.6254 3.47932L16.4939 4.21874L0.998906 4.21875C0.50389 4.21875 0.1026 3.81746 0.1026 3.32245C0.1026 2.82743 0.50389 2.42614 0.998906 2.42614L15.1253 2.42613C15.511 1.69889 16.3145 0.91748 17.7135 0.91748C18.6386 0.91748 19.3256 1.27432 19.7865 1.76758C19.9832 1.9781 20.1315 2.20514 20.2413 2.42613L23.2063 2.42614C23.7013 2.42614 24.1026 2.82743 24.1026 3.32245C24.1026 3.81747 23.7013 4.21876 23.2063 4.21875L18.8555 4.21874L18.724 3.47932C18.7027 3.35968 18.6279 3.15332 18.4767 2.99148C18.3502 2.85614 18.1354 2.71009 17.7135 2.71009C17.2878 2.71009 17.0433 2.8598 16.8916 3.0121Z"
              fill="#5BBD53"
            />
          </svg>
        </div>

        <h1
          className={`text-white font-ambit text-xl mt-1 overflow-hidden text-ellipsis transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          Edugator
        </h1>
      </div>
      {/* Main Sidebar Content */}
      <div className="h-full flex flex-col items-center justify-between py-4 w-full px-3">
        <section className="w-full flex flex-col space-y-4">
          {/* Courses */}
          <div className="flex flex-col space-y-4">
            {classes.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveClass(index);
                  setOpen(false);
                }}
                className={`w-full flex overflow-hidden border-2 transition-all rounded-md ${
                  open ? "p-2" : "p-1"
                }
              ${
                activeClass === index
                  ? "bg-slate-500/20 border-slate-500"
                  : "bg-slate-500/10 border-transparent hover:bg-slate-500/20"
              }`}
              >
                {/* Class Icon */}
                <div className="!max-h-[48px] !max-w-[48px] !min-h-[36px] !min-w-[36px] w-full h-full">
                  <AspectRatio.Root
                    ratio={1 / 1}
                    asChild
                    className="rounded-sm relative"
                  >
                    <Image src={item.icon} layout="fill" objectFit="cover" />
                  </AspectRatio.Root>
                </div>
                {/* Class Info */}
                <section
                  className={`flex ml-3 justify-center h-full flex-col whitespace-nowrap overflow-hidden text-left leading-none transition-opacity ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h1
                    className={`font-bold text-white overflow-hidden text-ellipsis`}
                  >
                    {item.name}
                  </h1>
                  <p
                    className={`text-white text-sm overflow-hidden text-ellipsis`}
                  >
                    {item.course}
                  </p>
                </section>
              </button>
            ))}
            {/* Add New Course Button (Radix) */}
            <button
              className={`w-full h-12 rounded-md overflow-hidden flex items-center justify-start pr-[14px] group space-x-4 text-nav-inactive-light `}
            >
              <div className="h-12 w-12 min-w-[3rem] bg-slate-50/5 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 min-w-[1rem] ">
                  {icons.plusThin(false)}
                </div>
              </div>
              <div
                className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Add new course
              </div>
            </button>
          </div>
          {/* Divider */}
          <Divider />
          {/* Button Group */}
          <div className="flex flex-col space-y-2">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                open={open}
                icon={link.icon}
                text={link.text}
                active={activeLink === link.text}
                setActiveLink={setActiveLink}
              />
            ))}
          </div>
        </section>
        {/* Bottom Group */}
        <div className="w-full space-y-4">
          <div className="flex flex-col space-y-2">
            {/* Theme Toggle */}
            <button
              className={`w-full h-12 rounded-md overflow-hidden relative flex items-center justify-between px-[14px] group text-nav-inactive-light hover:bg-emerald-500/5`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className="flex space-x-4">
                <div className="w-5 h-5 min-w-[20px] relative">
                  <div
                    className={`absolute top-0 left-0 w-full h-full transition-all ${
                      darkMode
                        ? "right-5 opacity-0 rotate-90"
                        : "opacity-100 rotate-0 right-0"
                    }`}
                  >
                    {icons.sun(false)}
                  </div>
                  <div
                    className={`absolute left-0 top-0 w-full h-full transition-all ${
                      darkMode
                        ? "opacity-100 rotate-0 right-0"
                        : "opacity-0 -rotate-90 -right-5"
                    }`}
                  >
                    {icons.moon(false)}
                  </div>
                </div>
                <label
                  className={`text-sm group-hover:text-white pointer-events-none transition text-ellipsis whitespace-nowrap ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                  htmlFor="dark-mode"
                >
                  Dark Mode
                </label>
              </div>
              <Switch.Root
                className="w-[42px] h-[25px] rounded-full relative border border-emerald-500/50 data-[state=checked]:bg-emerald-500 outline-none cursor-default"
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </button>
          </div>
          {/* Settings */}
          <button
            className={`w-full h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
          >
            <div className="w-5 h-5 min-w-[20px]">{icons.cog(false)}</div>
            <div
              className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Settings
            </div>
          </button>
          {/* Divider */}
          <Divider />
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`w-full h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
          >
            <div
              className={`w-5 h-5 min-w-[20px] transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              {icons.expandArrow(false)}
            </div>
            <div
              className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Collapse
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  icon,
  text,
  open,
  active,
  setActiveLink,
}: {
  icon: (active: boolean) => React.ReactNode;
  text: NavLinkText;
  open: boolean;
  active: boolean;
  setActiveLink: (text: NavLinkText) => void;
}) => {
  return (
    <button
      onClick={() => setActiveLink(text)}
      className={`w-full h-12 rounded-md overflow-hidden box-border flex items-center justify-start px-[14px] group space-x-4 ${
        active
          ? "bg-emerald-500/10 border-emerald-500/40 border text-white font-medium"
          : "text-nav-inactive-light hover:bg-emerald-500/5"
      }`}
    >
      <div className="w-5 h-5 min-w-[20px]">{icon(active)}</div>
      <label
        className={`text-sm group-hover:text-white pointer-events-none transition text-ellipsis whitespace-nowrap ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </label>
    </button>
  );
};

export default SideNavigation;
