import About from "components/LandingPage/About";
import Hero from "components/LandingPage/Hero";
import Instructors from "components/LandingPage/Instructors";
import LandingFeatures from "components/LandingPage/LandingFeatures";
import LandingHome from "components/LandingPage/LandingHome";
import LandingTopics from "components/LandingPage/LandingTopics";
import Students from "components/LandingPage/Students";
import AI from "components/LandingPage/AI";
import { EdugatorLogo } from "components/SideNav/navIcons";
import Link from "next/link";
import Footer from "components/LandingPage/Footer";
import { GradientButton } from "components/LandingPage/GradientButton";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import ExpandArrow from "components/LandingPage/ExpandArrow";

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col bg-nav-darkest overflow-x-hidden">
      <header className="w-full h-16 flex items-center justify-center z-10">
        <div className="max-w-7xl flex w-full justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center">
              <EdugatorLogo />
            </div>
            <h1 className="text-xl font-semibold text-white font-ambit">
              Edugator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <a className="text-sm font-dm text-white">Login</a>
            </Link>
            <Link href="/signup">
              <a className="text-sm font-dm text-white">Sign Up</a>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex flex-col bg-nav-darkest">
        <Hero />
        <About />
        <Students />
        <Instructors />
        <AI />

        <div className="pb-48 pt-12 md:pt-48 bg-slate-50">
          <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-y-8">
            <div className="flex w-full flex-col lg:flex-row lg:space-x-2 space-y-16 lg:space-y-0 items-start justify-center">
              <div className="w-full flex flex-col space-y-4">
                <h1 className="text-3xl font-semibold text-nav-darkest font-ambit max-w-sm">
                  Interested in Edugator for your school?
                </h1>
                <p className="text-nav-darkest">
                  Contact us, we'd love to hear from you!
                </p>
                <button className="group flex items-center space-x-1 mt-4">
                  <span className="font-dm text-nav-darker font-bold">
                    Contact Us
                  </span>
                  <ExpandArrow />
                </button>
              </div>
              <div className="w-full flex flex-col space-y-4">
                <h1 className="text-3xl font-semibold text-nav-darkest font-ambit max-w-sm">
                  Built by students, for students.
                </h1>
                <p className="text-nav-darkest">
                  Edugator is designed by researchers and engineers with
                  excessive obsession for student centered learning.
                </p>
                <span className="flex items-center space-x-1">
                  <p className="text-nav-darkest">Built with</p>
                  <HeartFilledIcon className="w-4 h-4 text-red-500 mx-1" />
                  <p className="text-nav-darkest">
                    at the University of Florida.
                  </p>
                </span>
                <button className="group flex items-center space-x-1 mt-4">
                  <span className="font-dm text-nav-darker font-bold">
                    Meet Our Team
                  </span>
                  <ExpandArrow />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      {/* <VerticalNavigation light></VerticalNavigation>
        <LandingHome />
        <LandingFeatures />
        <LandingTopics />
        <Footer /> */}
    </div>
  );
}
