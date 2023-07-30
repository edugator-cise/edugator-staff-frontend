import { EdugatorLogo } from "components/navigation/navIcons";
import { useClerk } from "@clerk/nextjs";
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const UserButton = () => {
  const { user } = useClerk();

  const imageUrl = user?.imageUrl;
  const firstName = user?.firstName || "First";
  const lastName = user?.lastName || "Last";
  const email = user?.emailAddresses[0].emailAddress || "";

  return (
    <Popover.Root>
      <Popover.Trigger
        className={`rounded-md overflow-hidden flex items-center justify-start group space-x-4 text-nav-inactive-light cursor-pointer bg-black/20`}
      >
        <div className="w-7 h-7 min-w-[28px] rounded-full relative focus:ring-2 outline-none transition">
          <Image
            src={
              imageUrl ||
              "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
            }
            alt="User profile picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        side="bottom"
        sideOffset={5}
        className="PopoverContent z-50 border-[#3A3F49] dark:border-[#484F5B] bg-[#242934] dark:bg-[#333B49] min-w-[200px] max-w-[300px] border rounded-lg shadow-md flex flex-col"
      >
        <ul className="space-y-2">
          <li className="flex space-x-4 items-center p-4 pb-2 rounded-sm ">
            <div className="w-10 h-10 min-w-[40px] rounded-full relative focus:ring-2 outline-none transition">
              <Image
                src={
                  imageUrl ||
                  "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                }
                alt="User profile picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col space-y-0 overflow-hidden">
              <p className="text-sm font-dm font-semibold text-white whitespace-nowrap truncate max-w-full">
                {firstName} {lastName}
              </p>
              <p className="text-xs text-gray-400 truncate whitespace-nowrap">
                {email}
              </p>
            </div>
          </li>
          <div className="w-full h-px bg-[#3A3F49] dark:bg-[#484F5B]"></div>
          <div className="flex flex-col space-y-1 pb-2">
            <li className="px-4 hover:bg-[#2F343E] dark:hover:bg-[#3D4552] hover:border-y-[#3A3F49] dark:hover:border-y-[#484F5B] border-y border-y-transparent hover:text-white py-2 group flex space-x-3 cursor-pointer items-center transition">
              <ExitIcon className="text-gray-500 group-hover:text-white/80 transition" />
              <p className="text-[13px] text-gray-400 font-sans transition group-hover:text-white truncate max-w-full">
                Sign Out
              </p>
            </li>
          </div>
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
};

const CourseHeader = () => {
  return (
    <div className="h-[50px] min-h-[50px] bg-[#090B11] border-b border-b-white/20 w-full flex py-1 justify-between items-center px-4">
      <div className="flex items-center cursor-pointer">
        <Link href="/courses">
          <div className="w-10 h-10 min-w-[2.8rem] p-1 flex items-center mr-2">
            <EdugatorLogo />
          </div>
        </Link>
      </div>
      <UserButton />
    </div>
  );
};

export default CourseHeader;
