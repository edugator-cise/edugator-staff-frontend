import Link from "next/link";
import React from "react";
import { CornerDivider } from "./LandingPage/Dividers";
import Footer from "./LandingPage/Footer";
import { GradientButton } from "./LandingPage/GradientButton";
import { EdugatorLogo } from "./SideNav/navIcons";

const LegalLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="min-h-screen flex-col flex overflow-scroll w-full max-w-full bg-slate-50 relative">
      <header className={`z-50 flex justify-center bg-nav-darkest`}>
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid items-center h-16 grid-cols-6 space-x-3">
          <Link href="/">
            <div className="flex col-span-3 justify-start items-center space-x-2">
              <div className="cursor-pointer w-12 h-12 min-w-[3rem] p-1 flex items-center">
                <EdugatorLogo />
              </div>
              <h1
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
                }}
                className={`text-xl cursor-pointer font-semibold transition font-ambit text-slate-50`}
              >
                Edugator
              </h1>
            </div>
          </Link>

          <div className="flex justify-end col-span-3">
            <GradientButton text="Start Coding" href="/code" />
          </div>
        </div>
      </header>
      <section className="pb-12 md:pb-14 sm:pb-10 h-48 sm:h-64 px-10 relative bg-gradient-to-b from-nav-darkest via-nav-darkest to-[#0a080f] flex justify-center items-end">
        <div className="hidden sm:block w-10 h-10 absolute left-0 bottom-0">
          <CornerDivider fill={"#F8FAFC"} />
        </div>
        <div className="hidden sm:block w-10 h-10 absolute right-0 bottom-0 -scale-x-100">
          <CornerDivider fill={"#F8FAFC"} />
        </div>
        <h1
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
          }}
          className="text-3xl sm:text-4xl md:text-5xl font-ambit text-white z-20 text-center"
        >
          {title}
        </h1>
        <div
          style={{
            background:
              "radial-gradient(50% 70% at 50% 80%, rgba(59, 131, 246, 0.178) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
          className="w-full h-full absolute inset-0"
        />
        <div
          style={{
            backgroundImage: "radial-gradient(#3b82f69b 1px, transparent 0)",
            backgroundSize: "35px 35px",
            backgroundPosition: "-10px -10px",
            // radial mask
            WebkitMaskImage:
              "radial-gradient(circle at 50% 100%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
          }}
          className="w-full h-full absolute inset-0"
        />
      </section>

      {/* Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 bg-slate-50 text-nav-darkest">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalLayout;
