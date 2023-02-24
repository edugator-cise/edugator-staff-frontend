import React, { useEffect, useState } from "react";
import {
  Code,
  HouseSimple,
  CaretRight,
  XCircle,
  Sliders,
} from "phosphor-react";
import AnimateHeight from "react-animate-height";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Divider = () => {
  return <div className="w-full h-px bg-gray-300 dark:bg-gray-600"></div>;
};

const ClassSelect = ({ open }: { open: boolean }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`w-full flex items-center rounded-lg space-x-3 bg-black/20 border border-white/20 transition-all ${
            open ? "p-2" : "p-0"
          }`}
          aria-label="Select class"
        >
          <div className="bg-white h-10 w-10 min-w-[2.5rem] rounded-md relative">
            <Image src="/DSALogo.png" layout="fill" objectFit="contain" />
          </div>
          <section className="flex h-full rounded-md flex-col whitespace-nowrap justify-center overflow-hidden text-left leading-none">
            <h1 className="font-bold text-white overflow-hidden text-ellipsis">
              COP3530
            </h1>
            <p className="text-slate-300 text-sm overflow-hidden text-ellipsis">
              Data Structures and Algorithms
            </p>
          </section>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          side={open ? "bottom" : "right"}
          className="PopoverContent bg-white p-2 rounded-md shadow-lg z-50 transition-all radix-state-open:opacity-100 opacity-0 origin-radix-popover"
          sideOffset={open ? 10 : 20}
        >
          <div className="flex flex-col space-y-2">
            <button className="flex items-center space-x-3 bg-slate-100 p-2 rounded-md max-w-[18rem] w-[18rem]">
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
            <button className="flex items-center space-x-3 hover:bg-slate-100 p-2 rounded-md max-w-[18rem] w-[18rem]">
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

const SideNavigation = () => {
  const [open, setOpen] = useState(false);
  const [classSelectHeight, setClassSelectHeight] = useState<number | "auto">(
    0
  );

  useEffect(() => {
    if (open) {
      setClassSelectHeight("auto");
    } else {
      setClassSelectHeight(0);
    }
  }, [open]);

  const router = useRouter();
  const { pathname } = router;

  console.log(pathname);
  return (
    <nav
      className={`transition-all  overflow-hidden ease-in-out h-full bg-slate-900 flex flex-col items-center justify-between ${
        open ? "min-w-[20rem] w-20" : "w-[4.5rem] min-w-[4.5rem]"
      }`}
    >
      {/* Top Group */}
      <div className="w-full space-y-3 p-3">
        {/* Logo */}
        <div className="w-full flex items-center justify-start">
          <h1
            className={`font-bold font-poppins text-center w-full text-white text-lg transition-opacity ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            Edugator
          </h1>
        </div>

        {/* <AnimateHeight
          id="example-panel"
          duration={150}
          height={classSelectHeight}
        >
          <div className="h-20 w-full bg-black rounded-md"></div>
        </AnimateHeight> */}
        <ClassSelect open={open} />
        {/* Home Icon */}
        <div className="w-full h-12 rounded-md flex items-center justify-start pr-2 hover:bg-white/10 cursor-pointer">
          <HouseSimple
            color="white"
            weight="bold"
            className="mx-4 w-4 h-4 min-w-[16px] pointer-events-none"
          />
          <p
            className={`text-white font-poppins text-ellipsis overflow-hidden text-sm transition-opacity ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            Home
          </p>
        </div>
        {/* Code Icon */}
        <div className="w-full h-12 bg-white/20 rounded-md flex items-center justify-start pr-2 hover:bg-white/10 cursor-pointer">
          <Code
            color="white"
            weight="bold"
            className="mx-4 w-4 h-4 min-w-[16px]"
          />
          <p
            className={`text-white font-poppins text-ellipsis overflow-hidden text-sm transition-opacity ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            Problems
          </p>
        </div>
      </div>
      {/* Bottom Group */}
      <div className="w-full space-y-4 p-4" onClick={() => setOpen(!open)}>
        {/* Collapse Icon */}

        <div className="w-full aspect-w-1 aspect-h-1 rounded-md flex items-center justify-center hover:bg-white/10 cursor-pointer">
          <CaretRight color="white" weight="bold" className="p-2" />
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
