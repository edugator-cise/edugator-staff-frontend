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
import CTA from "components/LandingPage/CTA";

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
        <CTA />
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
