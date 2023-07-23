import { UserButton } from "@clerk/clerk-react";
import { EdugatorLogo } from "components/navigation/navIcons";
import { useEffect, useState } from "react";
import { GradientButton } from "./GradientButton";
import { useScroll } from "framer-motion";
import useYPosition from "hooks/useYPosition";
import { useAuthenticatedFetch } from "hooks/useAuthenticatedFetch";
import { NextRoutes } from "constants/navigationRoutes";

const NavLink = ({
  id,
  text,
  dark,
}: {
  id: string;
  text: string;
  dark: boolean;
}) => {
  //scroll to id on click
  const scrollTo = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <p
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
      }}
      onClick={scrollTo}
      className={`text-sm font-dm py-2 px-4 rounded-md transition cursor-pointer ${
        dark
          ? "text-slate-50 hover:bg-slate-50/10"
          : "text-nav-darkest hover:bg-nav-darkest/10"
      }`}
    >
      {text}
    </p>
  );
};

const navLinks = [
  { id: "about", text: "About" },
  { id: "students", text: "Students" },
  { id: "instructors", text: "Instructors" },
  { id: "cta", text: "Contact" },
];

const Header = () => {
  const { scrollY } = useScroll();
  const authenticatedFetch = useAuthenticatedFetch();
  // track when scrollY exceeds 100
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerDark, setHeaderDark] = useState(true);

  const aboutY = useYPosition("about");
  const ctaY = useYPosition("cta");
  const studentsY = useYPosition("students");

  useEffect(() => {
    scrollY.onChange(() => {
      const scrollPosition = scrollY.get();
      if (scrollPosition > 100) {
        setIsScrolled(true);
        if (
          aboutY &&
          studentsY &&
          scrollPosition > aboutY - 50 &&
          scrollPosition < studentsY
        ) {
          setHeaderDark(false);
        } else if (
          studentsY &&
          ctaY &&
          scrollPosition > studentsY &&
          scrollPosition < ctaY
        ) {
          setHeaderDark(true);
        } else if (ctaY && scrollPosition > ctaY - 50) {
          setHeaderDark(false);
        } else {
          setHeaderDark(true);
        }
      } else {
        setIsScrolled(false);
      }
    });
  }, [scrollY, aboutY, studentsY, ctaY]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all flex justify-center duration-[0.4s] ease ${
        isScrolled ? "backdrop-blur-md" : ""
      } ${headerDark ? "bg-nav-darkest/75" : "bg-slate-100/75"}`}
    >
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid items-center h-16 grid-cols-6 space-x-3 lg:h-16 lg:justify-center">
        <div
          onClick={() => {
            // scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className=" flex col-span-4 lg:col-span-1 justify-start items-center space-x-2 cursor-pointer"
        >
          <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center">
            <EdugatorLogo />
          </div>
          <h1
            style={
              headerDark
                ? {
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
                  }
                : {
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 50%)",
                  }
            }
            className={`text-xl font-semibold transition font-ambit ${
              headerDark ? "text-slate-50" : "text-nav-darkest"
            }`}
          >
            Edugator
          </h1>
        </div>
        <div
          className={`justify-center hidden lg:col-span-4 lg:space-x-8 xl:space-x-10 lg:flex`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              id={link.id}
              text={link.text}
              dark={headerDark}
            />
          ))}
        </div>
        <div className="flex justify-end col-span-2 lg:col-span-1 lg:space-x-4">
          <GradientButton text="Beta" href="/code" />
          <UserButton
            afterSignOutUrl={NextRoutes.SignIn}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
