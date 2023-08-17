import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { User } from "phosphor-react";
import { placeholderAvatar } from "constants/coverImageData";

const CustomUserButton = () => {
  const { user } = useClerk();

  const imageUrl = user?.imageUrl;
  const firstName = user?.firstName || "First";
  const lastName = user?.lastName || "Last";
  const email = user?.emailAddresses[0].emailAddress || "";

  return (
    <>
      <Popover.Root>
        <Popover.Trigger className="w-8 h-8 rounded-full relative cursor-pointer focus:ring-2 outline-none transition">
          <Image
            src={imageUrl || placeholderAvatar}
            alt="User profile picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </Popover.Trigger>
        <Popover.Content
          align="end"
          side="bottom"
          sideOffset={5}
          className="PopoverContent min-w-[200px] max-w-[300px] bg-white border rounded-lg shadow-md flex flex-col p-2"
        >
          <ul className="space-y-2">
            <li className="flex space-x-4 items-center p-2 rounded-sm">
              <div className="w-10 h-10 min-w-[40px] rounded-full relative focus:ring-2 outline-none transition">
                <Image
                  src={imageUrl || placeholderAvatar}
                  alt="User profile picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-0 overflow-hidden">
                <p className="text-sm font-dm font-semibold text-gray-700 truncate max-w-full">
                  {firstName} {lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>
            </li>
            <div className="w-full h-px bg-slate-200"></div>
            <div className="flex flex-col space-y-1">
              {/* <li className="px-2 py-2 group flex space-x-3 cursor-pointer items-center hover:bg-slate-50 transition">
                <p className="text-sm font-dm transition group-hover:text-blue-500 text-gray-700 truncate max-w-full">
                  Manage account
                </p>
              </li> */}
              <li className="px-2 py-2 group flex space-x-3 cursor-pointer items-center hover:bg-slate-50 transition">
                <p className="text-[13px] font-sans transition group-hover:text-blue-500 text-gray-700 truncate max-w-full">
                  Sign Out
                </p>
              </li>
            </div>
          </ul>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default CustomUserButton;
