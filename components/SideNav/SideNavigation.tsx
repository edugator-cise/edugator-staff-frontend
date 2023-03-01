import React, { useEffect, useState } from "react";
import { CaretDown } from "phosphor-react";
import AnimateHeight from "react-animate-height";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTheme } from "next-themes";

import { icons } from "./navIcons";

const Divider = () => {
  return <div className="w-full h-px bg-slate-600"></div>;
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
    <NavLinkTooltip text={text} disabled={open}>
      <button
        onClick={() => setActiveLink(text)}
        className={`w-full h-12 rounded-md overflow-hidden box-border flex items-center justify-start px-[14px] group space-x-4 ${
          active
            ? "bg-emerald-500/10 ring-emerald-500/40 ring-2 text-white font-medium"
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
    </NavLinkTooltip>
  );
};

const NavLinkTooltip = ({
  text,
  children,
  disabled,
}: {
  text: string;
  children: React.ReactNode;
  disabled: boolean;
}) => {
  const [open, setOpen] = useState(false);

  // hide tooltip on sidebar collapse
  useEffect(() => {
    if (!disabled) setOpen(false);
  }, [disabled]);

  return (
    <Tooltip.Provider disableHoverableContent={disabled} delayDuration={150}>
      <Tooltip.Root open={disabled ? false : open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            className="TooltipContent z-50 data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade text-sm font-dm select-none rounded-[4px] bg-nav-darker border border-slate-700 text-slate-300 px-3 py-2 leading-none will-change-[transform,opacity]"
            sideOffset={10}
          >
            {text}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
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
  {
    icon: icons.bug,
    text: "Bug Bounty",
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
type NavLinkText =
  | "Dashboard"
  | "View All"
  | "Lessons"
  | "Problems"
  | "Bug Bounty";

const SideNavigation = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<NavLinkText>("Dashboard");
  const [activeClass, setActiveClass] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const { pathname } = router;

  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav
      className={`transition-all shadow-[0_0_1px_red] font-dm overflow-hidden h-full bg-nav-darker 111727 flex flex-col items-center justify-start ${
        open ? "min-w-[18rem] w-[18rem]" : "w-5 min-w-[5rem]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 w-full bg-gradient-to-tl from-nav-darker via-nav-darker to-emerald-900/40 px-3">
        <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center mr-2">
          <svg
            className="w-full"
            viewBox="0 0 25 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
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
      <div className="h-full flex flex-col items-center justify-between py-4 w-full px-4">
        {/* Top Group */}
        <section className="w-full flex flex-col space-y-4">
          {/* Class Group */}
          <div
            className={`flex flex-col space-y-3 transition-all rounded-md ${
              open ? "p-2 bg-nav-darkest ring-2 ring-[#060b14]" : "p-0"
            }`}
          >
            {classes.map((item, index) => (
              <NavLinkTooltip
                text={`${item.name}: ${item.course}`}
                disabled={open}
                key={index}
              >
                <div
                  onClick={() => {
                    setActiveClass(index);
                    setOpen(false);
                  }}
                  className={`w-full flex p-1 transition-all hover:bg-blue-500/10 items-center relative ${
                    activeClass === index && !open ? "ring-2 ring-blue-500" : ""
                  } ${activeClass === index && open ? "bg-blue-500/10" : ""} ${
                    open ? "rounded-sm" : "rounded-md"
                  }`}
                >
                  {/* Class Icon */}
                  <div className="!max-h-[48px] !max-w-[48px] h-full !min-w-[40px]">
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
                      className={`font-bold text-white overflow-hidden text-ellipsis text-sm`}
                    >
                      {item.name}
                    </h1>
                    <p
                      className={`text-white/70 text-xs overflow-hidden text-ellipsis`}
                    >
                      {item.course}
                    </p>
                  </section>
                </div>
              </NavLinkTooltip>
            ))}
            <NavLinkTooltip disabled={open} text="Add Class">
              <div
                className={`w-full rounded-sm relative transition overflow-hidden cursor-pointer px-1 flex items-center group justify-start h-10`}
              >
                <div
                  className={`h-10 w-10 min-w-[2.5rem] rounded-full transition-all items-center justify-center flex ${
                    open ? "bg-white/5" : "group-hover:bg-white/5"
                  }`}
                >
                  <div className="w-3 h-3 min-w-[.75rem]">
                    {icons.plusThin(false)}
                  </div>
                </div>
                <p className="text-white/70 text-xs ml-3 whitespace-nowrap group-hover:text-white transition">
                  Add Class
                </p>
              </div>
            </NavLinkTooltip>
          </div>
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
            {mounted ? (
              <NavLinkTooltip text="Toggle Theme" disabled={open}>
                <div
                  className={`w-full h-12 cursor-pointer rounded-md overflow-hidden relative flex items-center justify-between px-[14px] group text-nav-inactive-light hover:bg-emerald-500/5`}
                  onClick={() => {
                    setTheme(currentTheme === "dark" ? "light" : "dark");
                  }}
                >
                  <div className="flex space-x-4">
                    <div className="w-5 h-5 min-w-[20px] relative">
                      <div
                        className={`absolute top-0 left-0 w-full h-full transition-all ${
                          currentTheme === "dark"
                            ? "right-5 opacity-0 rotate-90"
                            : "opacity-100 rotate-0 right-0"
                        }`}
                      >
                        {icons.sun(false)}
                      </div>
                      <div
                        className={`absolute left-0 top-0 w-full h-full transition-all ${
                          currentTheme === "dark"
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
                    checked={currentTheme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  >
                    <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                </div>
              </NavLinkTooltip>
            ) : (
              <></>
            )}
          </div>
          {/* Settings */}
          <NavLinkTooltip text="Settings" disabled={open}>
            <div
              className={`w-full cursor-pointer h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
            >
              <div className="w-5 h-5 min-w-[20px]">{icons.cog(false)}</div>
              <div
                className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Settings
              </div>
            </div>
          </NavLinkTooltip>
          {/* Divider */}
          <Divider />
          {/* Collapse/Expand Button */}
          <NavLinkTooltip text={"Expand"} disabled={open}>
            <div
              onClick={() => setOpen(!open)}
              className={`w-full cursor-pointer h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
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
            </div>
          </NavLinkTooltip>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
