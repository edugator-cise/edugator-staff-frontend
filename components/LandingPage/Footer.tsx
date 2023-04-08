import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { EdugatorLogo } from "components/SideNav/navIcons";
import Link from "next/link";
import React from "react";

const LegalLinks = () => [
  {
    name: "FERPA",
    href: "/ferpa",
  },
  {
    name: "Privacy Policy",
    href: "/privacypolicy",
  },
  {
    name: "Terms of Use",
    href: "/termsofuse",
  },
];

const UseCaseLinks = () => [
  {
    name: "Students",
    href: "/#students",
    id: "students",
  },
  {
    name: "Instructors",
    href: "/#instructors",
    id: "instructors",
  },
];

const FeaturesLinks = () => [
  {
    name: "About",
    href: "/#about",
    id: "about",
  },
  /* {
    name: "AI Features",
    href: "/#ai",
    id: "ai",
  }, */
];

const AboutLinks = () => [
  {
    name: "Our Team",
    href: "/team",
  },
  {
    name: "Contact Us",
    href: "mailto:kapooramanpreet@ufl.edu",
  },
];

const Footer = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pb-24 pt-12 md:pt-28 bg-slate-50">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">
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
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/edugator-cise"
            >
              <GitHubLogoIcon className="w-5 h-5 text-nav-darkest/40 transition hover:text-nav-darkest cursor-pointer" />
            </a>
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
              {FeaturesLinks().map((link) => (
                <Link key={link.name} href={`${link.href}`}>
                  <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-sm font-semibold uppercase text-nav-darkest/80 font-ambit">
                Use Cases
              </h1>
              {UseCaseLinks().map((link) => (
                <Link key={link.name} href={`${link.href}`}>
                  <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <h1 className="text-sm font-semibold uppercase text-nav-darkest/80 font-ambit">
                About
              </h1>
              {AboutLinks().map((link) => (
                <Link key={link.name} href={link.href}>
                  <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-sm font-semibold uppercase text-nav-darkest/80 font-ambit">
                Legal
              </h1>
              {LegalLinks().map((link) => (
                <Link key={link.name} href={link.href}>
                  <p className="text-nav-darkest/50 cursor-pointer hover:text-nav-darkest/80 transition text-sm">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
