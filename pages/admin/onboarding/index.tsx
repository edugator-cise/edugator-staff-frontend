import {
  ArrowRightIcon,
  CalendarIcon,
  CameraIcon,
} from "@radix-ui/react-icons";
import AuthLayout from "components/layouts/AuthLayout";
import ActionButton from "components/shared/Buttons/ActionButton";
import { Calendar } from "components/shared/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/shared/Popover";
import { DateRange } from "react-day-picker";
import { addDays, addMonths, format } from "date-fns";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

const OnboardingScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [language, setLanguage] = useState<"cpp" | "java" | "python">("cpp");

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addMonths(new Date(), 3),
  });

  return (
    <div className="w-[95vw] max-w-[850px] h-auto p-8 rounded-lg space-y-8 flex flex-col">
      <div className="w-full flex flex-col md:flex-row space-x-0 space-y-6 md:space-y-0 md:space-x-8">
        {/* Title and descr */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-white text-3xl font-semibold font-ambit">
              Create your first course
            </h1>
          </div>
          <p className="text-white/80 text-sm font-dm">
            Enter your course details below to get started.
          </p>
        </div>
        {/* Form */}
        <form className="flex flex-col  w-full rounded-md border border-slate-700 bg-nav-darker shadow-2xl shadow-blue-500/20 ring-offset-2 ring-offset-nav-darkest">
          <div className="w-full px-6 py-6 flex flex-col space-y-3 border-b border-b-nav-dark">
            <label className="text-white text-base font-semibold font-dm">
              What's the name of your course?
            </label>
            <div className="flex space-x-2 w-full">
              {/* Image */}
              <div className="rounded-md bg-slate-900 flex items-center justify-center border-slate-700 border min-w-[46px]">
                <CameraIcon className="text-white" />
              </div>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Intro to Computer Science"
                required
                className="bg-nav-dark w-full text-white px-4 py-3 text-sm rounded-md border border-slate-800"
              />
            </div>
          </div>
          <div className="w-full px-6 py-6 flex flex-col space-y-3 border-b border-b-nav-dark">
            <label className="text-white text-base font-semibold font-dm">
              When does your course start and end?
            </label>
            <div className="flex justify-between w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`w-fit min-w-[200px] flex items-center bg-nav-dark text-white border border-slate-800 px-4 py-3 font-dm text-sm rounded-md justify-start text-left font-normal ${
                      !startDate && "text-slate-300"
                    }`}
                  >
                    <CalendarIcon className="mr-3 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick dates</span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="PopoverContent w-auto !p-0 bg-white"
                  side="bottom"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="w-full px-6 py-6 flex flex-col space-y-3">
            <label className="text-white text-base font-semibold font-dm">
              What language will your course be taught in?
            </label>
            {/* Radio buttons for C++, Java, Python */}
            <RadioGroup.Root
              className="flex flex-col gap-3"
              onValueChange={(value) => {
                setLanguage(value as typeof language);
              }}
              defaultValue={language}
              aria-label="Course Language"
            >
              <div className="flex items-center">
                <RadioGroup.Item
                  className="peer bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                  value={"cpp"}
                  id={"cpp"}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                </RadioGroup.Item>
                <label
                  className="text-slate-300 text-base leading-none pl-3 font-dm"
                  htmlFor={"cpp"}
                >
                  C++
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  className="peer bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                  value={"java"}
                  id={"java"}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                </RadioGroup.Item>
                <label
                  className="text-slate-300 text-base leading-none pl-3 font-dm"
                  htmlFor={"java"}
                >
                  Java
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  className="peer bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                  value={"python"}
                  id={"python"}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                </RadioGroup.Item>
                <label
                  className="text-slate-300 text-base leading-none pl-3 font-dm"
                  htmlFor={"python"}
                >
                  Python
                </label>
              </div>
            </RadioGroup.Root>
          </div>
        </form>
      </div>

      <div className="w-full flex justify-between items-center">
        <a className="text-white/80 text-sm font-dm hover:text-white hover:underline cursor-pointer">
          Do this later
        </a>
        <ActionButton
          color="blue"
          disabled={!name || !date?.from || !date?.to || !language}
          /* onClick={() => {
            router.push("/admin/onboarding/complete");
          }} */
        >
          <Link href="/admin/onboarding/complete">
            <span className="font-dm text-sm">Next</span>
          </Link>
          <ArrowRightIcon className="ml-2" />
        </ActionButton>
      </div>
    </div>
  );
};

OnboardingScreen.getLayout = (page: NextPage) => {
  return <AuthLayout key="complete">{page}</AuthLayout>;
};

export default OnboardingScreen;
