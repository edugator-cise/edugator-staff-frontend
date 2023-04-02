import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { EdugatorLogo } from "components/SideNav/navIcons";
import React from "react";

const Footer = () => {
  return (
    <div className="pb-24 pt-12 md:pt-28 bg-slate-50">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-y-8">
        {/* <div className="flex w-full space-x-2 items-center justify-center">
          <div className="w-full h-px bg-slate-300" />
          <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center justify-center">
            <EdugatorLogo />
          </div>
          <div className="w-full h-px bg-slate-300" />
        </div> */}
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between">
          <div className="w-full lg:w-1/3 flex flex-col space-y-4 lg:pr-16 lg:border-r border-r-slate-300 mt-16 lg:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center">
                <EdugatorLogo />
              </div>
              <h1 className="text-xl font-semibold text-nav-darkest font-ambit">
                Edugator
              </h1>
            </div>
            <GitHubLogoIcon className="w-5 h-5 text-nav-darkest/40 transition hover:text-nav-darkest cursor-pointer" />
            <p className="text-nav-darkest/60 text-sm">
              © Copyright 2022 Edugator @ University of Florida Research
              Foundation, Inc. All Commercial Rights Reserved.
            </p>
          </div>
          <div className="w-full lg:w-2/3 lg:pl-16 flex flex-col sm:flex-row space-y-10 sm:space-y-0 justify-between">
            <div className="flex flex-col space-y-4">
              <h1 className="text-sm font-semibold uppercase text-nav-darkest/80 font-ambit">
                Features
              </h1>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                About
              </p>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                AI Features
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-sm font-semibold uppercase text-nav-darkest/80 font-ambit">
                Use Cases
              </h1>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                Students
              </p>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                Instructors
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <h1 className="text-sm font-semibold uppercase text-nav-darkest/80 font-ambit">
                Company
              </h1>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                Our Team
              </p>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                Contact Us
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-sm font-semibold uppercase text-nav-darkest/80 font-ambit">
                Legal
              </h1>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                FERPA
              </p>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                Privacy Policy
              </p>
              <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
