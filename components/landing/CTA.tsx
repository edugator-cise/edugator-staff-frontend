import { HeartFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ExpandArrow from "./ExpandArrow";

const CTA = () => {
  return (
    <div className="pb-48 pt-12 md:pt-48 bg-slate-50" id="cta">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">
        <div className="flex w-full flex-col lg:flex-row lg:space-x-2 space-y-16 lg:space-y-0 items-start justify-center">
          <div className="w-full flex flex-col space-y-4">
            <div className="relative w-20 h-20 flex items-center justify-center drop-shadow-xl">
              <Image src="/images/universityIcon.png" layout="fill" />
            </div>
            <h1 className="text-3xl font-semibold text-nav-darkest font-ambit max-w-sm">
              Interested in Edugator for your course at UF?
            </h1>
            <p className="text-nav-darkest">
              Contact us, we'd love to hear from you!
            </p>
            <Link href="mailto:kapooramanpreet@ufl.edu">
              <button className="group flex items-center space-x-1 mt-4">
                <span className="font-dm text-nav-darker font-medium">
                  Contact Us
                </span>
                <ExpandArrow />
              </button>
            </Link>
          </div>
          <div className="w-full flex flex-col space-y-4">
            <div className="relative h-20 flex items-center justify-start">
              <div className="w-16 h-16 rounded-full bg-slate-50 p-[2px] ring-slate-400/30 shadow-black/10 shadow-xl z-30">
                <div className="w-full h-full rounded-full relative overflow-hidden border bg-gradient-to-br from-sky-100 to-sky-600">
                  <Image src="/images/avatars/small/dustin.png" layout="fill" />
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-50 p-[2px] ring-slate-400/30 shadow-black/10 shadow-xl -translate-x-1/3 z-20">
                <div className="w-full h-full rounded-full relative overflow-hidden border bg-gradient-to-br from-sky-100 to-sky-600">
                  <Image src="/images/avatars/small/marc.png" layout="fill" />
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-50 p-[2px] ring-slate-400/30 shadow-black/10 shadow-xl -translate-x-2/3 z-10">
                <div className="w-full h-full rounded-full relative overflow-hidden border bg-gradient-to-br from-sky-100 to-sky-600">
                  <Image src="/images/avatars/small/aman.png" layout="fill" />
                </div>
              </div>
              {/* <Image src="/images/chalkboardIcon.png" layout="fill" /> */}
            </div>
            <h1 className="text-3xl font-semibold text-nav-darkest font-ambit max-w-sm">
              Built by students, for students.
            </h1>
            <p className="text-nav-darkest">
              Edugator is designed by researchers and engineers with excessive
              obsession for student centered learning.
            </p>
            <span className="flex items-center space-x-1">
              <p className="text-nav-darkest">Built with</p>
              <HeartFilledIcon className="w-4 h-4 text-red-500 mx-1" />
              <p className="text-nav-darkest">at the University of Florida.</p>
            </span>
            <Link href="/team">
              <button className="group flex items-center space-x-1 mt-4">
                <span className="font-dm text-nav-darker font-medium">
                  Meet Our Team
                </span>
                <ExpandArrow />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
