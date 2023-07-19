import { ArrowRightIcon, CameraIcon } from "@radix-ui/react-icons";
import AuthLayout from "components/layouts/AuthLayout";
import ActionButton from "components/shared/Buttons/ActionButton";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const OnboardingScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
        <form className="flex flex-col  w-full rounded-md border border-slate-700 bg-nav-darker shadow-2xl shadow-blue-500/20 ring-1 ring-offset-2 ring-offset-nav-darkest">
          <div className="w-full px-6 py-6 flex flex-col space-y-2 border-b border-b-nav-dark">
            <label className="text-white text-base font-semibold font-dm">
              Whats the name of your course?
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
          <div className="w-full px-6 py-6 flex flex-col space-y-2 border-b border-b-nav-dark">
            <label className="text-white text-base font-semibold font-dm">
              When does your course start and end?
            </label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Intro to Computer Science"
              required
              className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md border border-slate-800"
            />
          </div>
          <div className="w-full px-6 py-6 flex flex-col space-y-2">
            <label className="text-white text-base font-semibold font-dm">
              Whats the name of your course?
            </label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Intro to Computer Science"
              required
              className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md border border-slate-800"
            />
          </div>
        </form>
      </div>

      <div className="w-full flex justify-between items-center">
        <a className="text-white/80 text-sm font-dm hover:text-white hover:underline cursor-pointer">
          Do this later
        </a>
        <ActionButton color="blue" onClick={() => {}}>
          <Link href="/admin/onboarding/roster">
            <span className="font-dm text-sm">Next</span>
          </Link>
          <ArrowRightIcon className="ml-2" />
        </ActionButton>
      </div>
    </div>
  );
};

OnboardingScreen.getLayout = (page: NextPage) => {
  return <AuthLayout key="onboarding">{page}</AuthLayout>;
};

export default OnboardingScreen;
