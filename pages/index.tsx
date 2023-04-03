import About from "components/LandingPage/About/About";
import Hero from "components/LandingPage/Hero";
import Instructors from "components/LandingPage/Instructors/Instructors";
import LandingFeatures from "components/LandingPage/LandingFeatures";
import LandingHome from "components/LandingPage/LandingHome";
import LandingTopics from "components/LandingPage/LandingTopics";
import Students from "components/LandingPage/Students/Students";
import AI from "components/LandingPage/AI";
import { EdugatorLogo } from "components/SideNav/navIcons";
import Link from "next/link";
import Footer from "components/LandingPage/Footer";
import { GradientButton } from "components/LandingPage/GradientButton";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import ExpandArrow from "components/LandingPage/ExpandArrow";
import CTA from "components/LandingPage/CTA";
import Header from "components/LandingPage/Header";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <Header />
      <main className="flex flex-col bg-nav-darkest overflow-x-hidden">
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
