import { Sparkle } from "phosphor-react";
import React, { useState, useRef, useEffect } from "react";
import wandAnimation from "./data/wandAnimation.json";
import Lottie from "lottie-react";
import Tilt from "react-parallax-tilt";
import { CornerDivider } from "./Dividers";
import useIsInView from "hooks/useIsInView";
import { useAnimation, motion as m } from "framer-motion";

const messages = [
  {
    from: "AI",
    message: "Hi, I'm Guppy! I'm here to help you learn to code.",
  },
  {
    from: "AI",
    message:
      'Looks like you\'re having trouble with the "for" loop. What exactly is the problem?',
  },
  {
    from: "User",
    message: "I'm not sure how to print out the numbers 1-10.",
  },
  {
    from: "AI",
    message: "Let me show you...",
  },
];

const AI = () => {
  const lottieRef = useRef(null);
  const ref = useRef(null);

  const messageControls = useAnimation();

  const messageVariants = (delay: number) => ({
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  const isInView = useIsInView({ ref: ref, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      messageControls.start("animate");
      //@ts-ignore
      lottieRef.current!.goToAndPlay(0, true);
      // lottieRef.current!.play();
    } else {
      messageControls.start("initial");
      //@ts-ignore
      lottieRef.current!.goToAndStop(0, true);
      // lottieRef.current!.stop();
    }
  }, [isInView]);

  return (
    <section className="pb-12 sm:pb-24 relative bg-gradient-to-b from-nav-darkest via-nav-darkest to-[#0a080f]">
      <div className="hidden sm:block w-10 h-10 absolute left-0 bottom-0">
        <CornerDivider fill={"#F8FAFC"} />
      </div>
      <div className="hidden sm:block w-10 h-10 absolute right-0 bottom-0 -scale-x-100">
        <CornerDivider fill={"#F8FAFC"} />
      </div>
      <div
        style={{
          background:
            "radial-gradient(50% 70% at 50% 80%, rgba(144, 88, 216, 0.178) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
        className="w-full h-full absolute inset-0"
      />
      <div
        style={{
          backgroundImage: "radial-gradient(#bb79f99b 1px, transparent 0)",
          backgroundSize: "35px 35px",
          backgroundPosition: "-10px -10px",
          // radial mask
          WebkitMaskImage:
            "radial-gradient(circle at 50% 100%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
        }}
        className="w-full h-full absolute inset-0"
      />
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full flex pt-24 flex-col">
          <div className="flex flex-col justify-center items-center">
            <span className="uppercase font-ambit text-sm text-ai-purple tracking-widest py-4">
              CODING SUPERPOWERS
            </span>
            <h2
              className="font-ambit text-white text-3xl font-semibold md:text-4xl lg:text-4xl 
                  !max-w-xl pb-6 sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-center"
            >
              Your AI-Powered Teaching Assistant
            </h2>
            <p className="font-inter text-white/80 sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-center mb-6">
              Introducing Guppy, a helpful GPT-powered chatbot that can answer
              questions about coding concepts and help you solve problems.
            </p>
            <div className="flex font-dm items-center space-x-2 text-white text-sm uppercase bg-gradient-to-br from-violet-400 to-ai-purple px-4 py-2 rounded-full">
              Coming Soon
            </div>
          </div>
        </div>
        <Tilt
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          transitionSpeed={2000}
          perspective={500}
          scale={1.05}
          gyroscope={true}
          glareEnable={false}
          glarePosition="all"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="w-full py-16 flex items-center flex-col justify-center relative group"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Sparkle Graphic */}

            {/* Chatbox */}
            <div
              style={{
                background:
                  "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
                transformStyle: "preserve-3d",
              }}
              ref={ref}
              className="w-72 sm:w-96 relative flex flex-col p-4 justify-start items-center border border-slate-500/20 rounded-md"
            >
              {/* Sparkle Icon */}
              <div className="absolute -top-6 !p-0 -right-8 flex items-center justify-center group-hover:translate-z-10 duration-700 ease-in-out">
                <Sparkle
                  size={54}
                  weight="fill"
                  className={`text-ai-purple fill-ai-purple drop-shadow-2xl  ${
                    isInView
                      ? "scale-100 opacity-100 rotate-6 transition-all ease-in-out delay-1000 duration-500"
                      : "scale-0 opacity-0 rotate-45"
                  }`}
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(130deg, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </div>
              {/* Magician Animation */}
              <div
                style={{
                  WebkitMaskImage:
                    "linear-gradient(140deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 65%)",
                }}
                className="absolute hidden sm:flex -bottom-52 !p-0 -left-64 items-center justify-center -scale-x-100 w-96 h-96 group-hover:translate-z-6 duration-700 ease-in-out"
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={wandAnimation}
                  loop={false}
                />
              </div>
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    className={`w-full flex transition-opacity mb-4 ${
                      message.from === "User" ? "justify-end" : "justify-start"
                    } `}
                  >
                    <div
                      style={{
                        transitionDelay: `${index * 0.1}s`,
                      }}
                      className={`w-fit max-w-[75%] rounded-t-xl py-1 px-2 flex justify-start transition-all group-hover:translate-z-6 duration-500 ease-in-out ${
                        message.from === "User"
                          ? "rounded-bl-xl bg-slate-500/20"
                          : "rounded-br-xl bg-gradient-to-br from-violet-500 to-ai-purple"
                      } `}
                    >
                      <p className="font-dm text-white text-xs sm:text-sm p-2">
                        {message.message}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* Loading Indicator */}
              <div className="w-full flex justify-start group-hover:translate-z-6 duration-500 ease-in-out delay-[400ms]">
                <div className="w-fit bg-ai-purple rounded-t-xl rounded-br-xl py-3 px-5 flex justify-start ">
                  <div className="bouncing-loader">
                    <div className="" />
                    <div className="" />
                    <div className="" />
                  </div>
                </div>
              </div>
            </div>
            {/* Chatbox Input */}
            <div className="w-72 sm:w-96  flex justify-center items-center mt-4">
              <input
                className="w-full bg-slate-500/20 rounded-md py-3 border border-slate-500/30 px-4 outline-none text-white/80 font-inter text-sm"
                placeholder="Type your question here..."
              />
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
};

export default AI;
