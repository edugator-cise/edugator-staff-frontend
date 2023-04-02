import React from "react";
import { CornerDivider } from "./Dividers";
import ExpandArrow from "./ExpandArrow";

const aboutData = [
  {
    title: "Build",
    description:
      "Build your curriculum and set your students up for success with our interactive instruction portal.",
    image: "",
  },
  {
    title: "Learn",
    description:
      "Learn the fundamentals of computer science with our interactive lessons and practice exercises.",
    image: "",
  },
  {
    title: "Practice",
    description:
      "Practice what you've learned with course-specific exercises and leetcode-style problems.",
    image: "",
  },
];

const About = () => {
  return (
    <div className="pb-48 pt-12 md:pt-28 bg-slate-50 relative">
      <div className="w-10 h-10 hidden sm:block absolute right-0 bottom-0 -scale-x-100">
        <CornerDivider fill={"#0C121C"} />
      </div>
      <div className="w-10 h-10 hidden sm:block absolute left-0 bottom-0 ">
        <CornerDivider fill={"#0C121C"} />
      </div>
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-y-8">
        <div className="container flex pt-24 pb-4 flex-col">
          <div className="flex flex-col justify-center items-center">
            <span className="uppercase font-ambit text-sm text-blue-500 tracking-widest pb-4">
              Learning Reimagined
            </span>
            <h2
              className="font-ambit text-3xl font-semibold md:text-4xl lg:text-4xl 
                  !max-w-xl text-center pb-6 sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-nav-darkest"
            >
              We manage your course content, so you can focus on teaching.
            </h2>
            <p className="font-inter sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-nav-darkest/80 text-center">
              We provide a platform for instructors to build and manage their
              course content.
            </p>
          </div>
        </div>
        <ul className="lg:grid-cols-3 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {aboutData.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start group cursor-pointer"
            >
              <div className="w-full h-52 bg-slate-200 rounded-md flex items-center justify-start"></div>
              <h3 className="font-ambit text-nav-darker text-xl font-semibold pt-4">
                {item.title}
              </h3>
              <p className="font-inter text-nav-darker/80 pt-2">
                {item.description}
              </p>
              <button className=" flex items-center space-x-1 mt-4">
                <span className="font-dm text-nav-darker font-bold">
                  Learn More
                </span>
                <ExpandArrow />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
