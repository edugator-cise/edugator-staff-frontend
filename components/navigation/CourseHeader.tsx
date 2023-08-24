import { EdugatorLogo, icons } from "components/navigation/navIcons";
import { useClerk } from "@clerk/nextjs";
//import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import { CheckIcon, Cross2Icon, ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { placeholderAvatar } from "constants/coverImageData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetUserInvitations } from "hooks/invitations/useGetUserInvitations";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useGetCourse } from "hooks/course/useGetCourse";
import { AnimatePresence, motion as m } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MoonStarIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggleButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div
      onClick={() => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
      }}
      className="p-2 overflow-hidden relative opacity-75 hover:opacity-100 rounded-md cursor-pointer transition flex items-center justify-center space-x-2"
    >
      {currentTheme === "dark" ? (
        <SunIcon className="text-yellow-400 w-4 h-4" />
      ) : (
        <MoonStarIcon className="text-slate-200 w-4 h-4" />
      )}
    </div>
  );
};

const NotificationButton = () => {
  const {
    data: invitationsData,
    isFetching: invitationsFetching,
    isError: invitationsError,
  } = useGetUserInvitations();

  return (
    <Popover>
      <PopoverTrigger className="relative">
        {invitationsData && invitationsData?.length > 0 && (
          <div className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1"></div>
        )}

        <div className="p-2 overflow-hidden relative opacity-75 hover:opacity-100 rounded-md cursor-pointer transition flex items-center justify-center space-x-2">
          <BellIcon className="w-4 h-4" color="white" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        align="end"
        side="bottom"
        sideOffset={5}
        className="PopoverContent p-0 z-50 border-white/10 bg-nav-dark min-w-[200px] max-w-[300px] border rounded-md"
      >
        <div className="flex flex-col">
          <div className="text-xs leading-[25px] text-gray-400 py-[6px] px-3 font-dm font-bold border-b border-b-slate-700">
            Invitations
          </div>
          {invitationsData?.length === 0 ? (
            <div className="text-xs text-gray-400 py-[6px] px-3 font-dm h-16 flex items-center justify-center">
              <p>You have no invitations...</p>
            </div>
          ) : (
            invitationsData?.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between px-4 py-3 space-x-4"
              >
                <div className="flex flex-col space-y-0">
                  <div className="text-sm font-medium text-white font-dm">
                    {invitation.courseName}
                  </div>
                  <div className="text-xs text-nav-inactive-light">
                    {invitation.role}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger autoFocus={false}>
                      <button
                        className="text-xs bg-green-300/10 transition p-2 ring-1 ring-green-500 hover:bg-green-500 group rounded-md"
                        onClick={() => {}}
                      >
                        <CheckIcon className="text-green-400 group-hover:text-white transition" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Accept Invitation
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                      <button
                        className="text-xs bg-red-300/10 transition p-2 ring-1 ring-red-500 hover:bg-red-500 group rounded-md"
                        onClick={() => {}}
                      >
                        <Cross2Icon className="text-red-400 group-hover:text-white transition" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Decline Invitation
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const UserButton = () => {
  const { user } = useClerk();

  const imageUrl = user?.imageUrl;
  const firstName = user?.firstName || "First";
  const lastName = user?.lastName || "Last";
  const email = user?.emailAddresses[0].emailAddress || "";

  const { signOut } = useClerk();

  return (
    <Popover>
      <PopoverTrigger
        className={`rounded-md overflow-hidden flex items-center justify-start group space-x-4 text-nav-inactive-light cursor-pointer bg-black/20`}
      >
        <div className="w-7 h-7 min-w-[28px] rounded-full relative focus:ring-2 outline-none transition">
          <Image
            src={imageUrl || placeholderAvatar}
            alt="User profile picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="PopoverContent p-0 z-50 border-white/10 bg-nav-dark min-w-[200px] max-w-[300px] border rounded-lg shadow-md flex flex-col"
      >
        <ul className="space-y-2">
          <li className="flex space-x-4 items-center p-4 pb-2 rounded-sm ">
            <div className="w-8 h-8 min-w-[32px] rounded-full relative focus:ring-2 outline-none transition">
              <Image
                src={imageUrl || placeholderAvatar}
                alt="User profile picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col space-y-0 overflow-hidden">
              <p className="text-sm font-dm text-white whitespace-nowrap truncate max-w-full">
                {firstName} {lastName}
              </p>
              <p className="text-xs text-white/40 truncate whitespace-nowrap">
                {email}
              </p>
            </div>
          </li>
          <div className="w-full h-px bg-white/10"></div>
          <button
            onClick={() => signOut()}
            className="flex flex-col space-y-1 pb-2 w-full"
          >
            <li className="px-4 w-full hover:bg-white/5 hover:border-y-white/10 border-y border-y-transparent hover:text-white py-2 group flex space-x-3 cursor-pointer items-center transition">
              <ExitIcon className="text-gray-500 group-hover:text-white/80 transition" />
              <p className="text-xs text-white/60 font-sans transition group-hover:text-white truncate max-w-full">
                Sign Out
              </p>
            </li>
          </button>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

const CourseHeader = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const { data: courseData, isFetching: courseFetching } = useGetCourse();

  return (
    <div className="h-[50px] min-h-[50px] bg-nav-evendarker border-b border-b-white/10 w-full flex py-1 justify-between items-center px-4">
      <div className="flex items-center gap-1">
        <div className="flex items-center cursor-pointer">
          <Link href="/courses">
            <div className="w-10 h-10 min-w-[2.8rem] p-1 flex items-center mr-2">
              <EdugatorLogo />
            </div>
          </Link>
        </div>
        <AnimatePresence>
          {courseId ? (
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0, duration: 0.2 },
              }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 0,
                  duration: 0.2,
                  ease: "easeInOut",
                  bounce: 10,
                  damping: 100,
                },
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex items-center space-x-3"
            >
              <div className="w-px h-6 -skew-x-12 bg-slate-700 mx-3"></div>
              <p className="text-sm font-dm text-slate-400">
                {courseData?.courseName}
              </p>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="gap-4 flex items-center">
        <div className="gap-3 flex items-center">
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <NotificationButton />
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <ThemeToggleButton />
            </TooltipTrigger>
            <TooltipContent side="bottom">Toggle Theme</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="h-6 bg-slate-700" />
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <UserButton />
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default CourseHeader;
