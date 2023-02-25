import React, { useEffect, useState } from "react";
import { CaretDown } from "phosphor-react";
import AnimateHeight from "react-animate-height";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { icons } from "./navIcons";

const Divider = () => {
  return <div className="w-full h-px bg-zinc-300 dark:bg-zinc-600"></div>;
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

  const router = useRouter();
  const { pathname } = router;

  console.log(pathname);
  return (
    <nav
      className={`transition-all font-dm py-4 overflow-hidden h-full px-3 bg-[#111825] flex flex-col items-center justify-between ${
        open ? "min-w-[18rem] w-[18rem]" : "w-[4.5rem] min-w-[4.5rem]"
      }`}
    >
      {/* Top Group */}
      <section className="w-full flex flex-col space-y-4">
        {/* Courses */}
        <div className="flex flex-col space-y-4">
          {classes.map((item, index) => (
            <button
              className={`w-full flex overflow-hidden border transition-all rounded-md ${
                open ? "p-2" : "p-1"
              }
              ${
                activeClass === index
                  ? "bg-slate-500/20 border-slate-500"
                  : "bg-slate-500/10 border-transparent"
              }`}
            >
              {/* Class Icon */}
              <div className="!max-h-[48px] !max-w-[48px] !min-h-[38px] !min-w-[38px] w-full h-full">
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
          <button className="w-full h-12 bg-white/10 rounded-md" />
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
          <button className="w-full h-12 bg-white/10 rounded-md" />
          {/* Settings */}
          <button
            className={`w-full h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-violet-500/5`}
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
        </div>
        <Divider />
        {/* Collapse/Expand Button */}
        <button
          className="w-full h-12 bg-white/10 rounded-md"
          onClick={() => setOpen(!open)}
        />
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
          ? "bg-violet-500/10 border-violet-500/40 border text-white font-medium"
          : "text-nav-inactive-light hover:bg-violet-500/5"
      }`}
    >
      <div className="w-5 h-5 min-w-[20px]">{icon(active)}</div>
      <div
        className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </div>
    </button>
  );
};

export default SideNavigation;
