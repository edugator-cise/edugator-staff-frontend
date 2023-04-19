import Image from "next/image";
import React from "react";
import { GradientButton } from "./GradientButton";
import { motion as m } from "framer-motion";
import { heroImageVariants } from "utils/variants";
import RotatingText from "./RotatingText";
import { CornerDivider } from "./Dividers";
import ExpandArrow, { ExpandArrowLight } from "./ExpandArrow";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="pb-36 sm:pb-24 md:pb-0 lg:pb-16 xl:pb-28 pt-12 md:pt-28 relative overflow-hidden md:overflow-visible">
      {/* Hero Gradient */}
      <div className="absolute -top-0 lg:-top-0 left-1/2 w-[901px] h-[901px] opacity-70">
        <img
          src="/images/HeroGradient.png"
          alt="section gradient"
          aria-hidden
        />
      </div>
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8 md:pb-96">
        <a
          href="/"
          style={{
            background:
              "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
          }}
          className="flex font-dm items-center space-x-2 text-white text-xs border border-slate-100/10 px-4 py-1 rounded-lg ring-slate-100/50"
        >
          Introducing Edugator
        </a>
        <span className="relative flex max-w-5xl text-4xl font-semibold text-center md:text-5xl lg:text-6xl font-ambit">
          <h1
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 100%)",
            }}
            className="text-white"
          >
            A New Way to Learn&nbsp;
            <RotatingText />
          </h1>
        </span>
        <p className="max-w-2xl font-inter text-lg text-center text-white/70 leading-8">
          Edugator is a platform where any UF student can practice computing
          concepts with rich immediate feedback. Designed to promote
          experiential life-long learning for computing learners.
          {/* and providing powerful
          tools for computing instructors that improve learning of computing. */}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-y-0 space-y-4 sm:space-x-8 z-[1]">
          <GradientButton text="Start Coding" href="/code" />
          <Link href="/#about">
            <button className="group flex items-center space-x-1">
              <span className="font-dm text-white font-bold">Learn More</span>
              <ExpandArrowLight />
            </button>
          </Link>
        </div>
        {/* Problem Statement Hero Image (centered at bottom) */}
        <m.div
          variants={heroImageVariants(0.3, "center")}
          initial="hidden"
          animate="visible"
          className="absolute hidden pointer-events-none md:flex top-[22rem] left-1/2 -translate-x-1/2 w-[80%] z-10 h-full items-end justify-center !origin-top-left"
        >
          <Image
            quality={100}
            src="/images/HeroProblemStatement.png"
            layout="fill"
            objectFit="contain"
            objectPosition="top center"
          />
        </m.div>
        <m.div
          variants={heroImageVariants(0.7, "left")}
          initial="hidden"
          animate="visible"
          className="absolute hidden pointer-events-none md:flex top-72 left-[15%] -translate-x-1/2 w-[30%] z-20 h-full items-end justify-center !origin-top-left"
        >
          <Image
            quality={100}
            src="/images/HeroExerciseList.png"
            layout="fill"
            objectFit="contain"
            objectPosition="top center"
          />
        </m.div>
        <m.div
          variants={heroImageVariants(0.5, "right")}
          initial="hidden"
          animate="visible"
          className="absolute hidden pointer-events-none md:flex top-56 right-[17%] translate-x-1/2 w-[44%] z-20 h-full items-end justify-center !origin-top-left"
        >
          <Image
            quality={100}
            src="/images/HeroProblemEditor.png"
            layout="fill"
            objectFit="contain"
            objectPosition="top center"
          />
        </m.div>
        <m.div
          variants={heroImageVariants(0.9, "right")}
          initial="hidden"
          //template since we want to keep x position constant
          animate="visible"
          className="absolute hidden pointer-events-none md:flex top-[39rem] right-[19%] translate-x-1/2 w-[45%] z-20 h-full items-end justify-center !origin-top-left"
        >
          <Image
            quality={100}
            src="/images/HeroFeedback.png"
            layout="fill"
            objectFit="contain"
            objectPosition="top center"
          />
        </m.div>
      </div>
    </div>
  );
};

export default Hero;
