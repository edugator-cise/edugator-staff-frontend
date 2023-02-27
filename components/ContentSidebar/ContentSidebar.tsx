import useNavigation from "hooks/useNavigation";
import React from "react";
import { LocalStorage } from "lib/auth/LocalStorage";
import { FetchStatus } from "hooks/types";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { createNavStructure } from "utils/CodeEditorUtils";
import {
  ILessonItem,
  INavigationItem,
  IProblemItem,
} from "components/CodeEditor/types";
import Link from "next/link";

const AccordionContent = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Accordion.Content
    className={
      "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden" +
      (className ? ` ${className}` : "")
    }
    {...props}
  >
    <div className="">{children}</div>
  </Accordion.Content>
);

const ContentSidebar = () => {
  const { problemAndLessonSet, status } = useNavigation(
    LocalStorage.getToken() !== null
  );

  const navigation = createNavStructure(problemAndLessonSet);

  return (
    <ScrollArea.Root className="overflow-hidden w-64 min-w-[16rem] h-full bg-[#192231] flex flex-col">
      <ScrollArea.Viewport className="w-full h-full">
        {/* Header */}
        <div className="w-full h-20 min-h-[5rem] flex items-center px-6">
          <h1 className="text-white font-dm font-medium text-lg">Exercises</h1>
        </div>
        {status === FetchStatus.loading ? (
          <div className="flex flex-col items-center justify-start h-full p-3 space-y-4">
            <div className="w-full h-12 rounded-md bg-slate-700 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/80 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/60 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/10 animate-pulse"></div>
          </div>
        ) : status === FetchStatus.failed ? (
          <div className="flex flex-col items-center justify-start h-full p-3 space-y-4">
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
          </div>
        ) : (
          <Accordion.Root className="w-full font-dm" type="multiple">
            {navigation &&
              navigation.map((value: INavigationItem, primaryIndex: number) => (
                <Accordion.Item value={value.name} key={primaryIndex}>
                  <Accordion.Trigger className="px-4 group py-3 border-b border-slate-700 w-full flex items-center justify-between">
                    <p className="font-medium text-left text-sm text-white">{`${
                      primaryIndex + 1
                    }. ${value.name}`}</p>
                    <ChevronDownIcon
                      className="text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                  <AccordionContent>
                    <div className="flex flex-col bg-slate-800">
                      {value.problems.map(
                        (problemItem: IProblemItem, secondaryIndex: number) => (
                          <Link
                            href={`/code/${problemItem._id}`}
                            key={problemItem._id}
                          >
                            <div
                              key={`${primaryIndex}-${secondaryIndex}`}
                              className="flex pr-4 pl-8 border-b border-b-slate-700 py-3 items-center cursor-pointer justify-between"
                            >
                              <p className="text-white text-sm">
                                {`${primaryIndex + 1}.${secondaryIndex + 1} ${
                                  problemItem.problemName
                                }`}
                              </p>
                            </div>
                          </Link>
                        )
                      )}
                      {value.lessons?.map(
                        (lessonItem: ILessonItem, index: number) => (
                          <Link
                            href={`/learn/${lessonItem._id}`}
                            key={lessonItem._id}
                          >
                            <div
                              key={`${primaryIndex}-${index}`}
                              className="flex pr-4 pl-8 border-b cursor-pointer border-b-slate-700 py-3 items-center justify-between"
                            >
                              <p className="text-white text-sm pointer-events-none">
                                {`${primaryIndex + 1}.${index + 1} ${
                                  lessonItem.lessonName
                                }`}
                              </p>
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </AccordionContent>
                  <Accordion.Content className="AccordionContent flex flex-col overflow-hidden bg-slate-800"></Accordion.Content>
                </Accordion.Item>
              ))}
          </Accordion.Root>
        )}
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-slate-600/60 transition duration-[160ms] ease-out hover:bg-white/20 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-slate-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-slate-600/60 transition duration-[160ms] ease-out hover:bg-white/20 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-slate-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-white/20" />
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};

export default ContentSidebar;
