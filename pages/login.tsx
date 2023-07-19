import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { EdugatorLogo } from "components/navigation/navIcons";
import ActionButton from "components/shared/Buttons/ActionButton";
import { useRouter } from "next/router";
import { GraduationCap, HandWaving, SignIn } from "phosphor-react";
import React, { useState, useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-screen min-h-screen h-screen bg-nav-darkest flex flex-col">
      {/* Header */}
      <header
        className={`flex justify-center bg-nav-darkest w-full items-center`}
      >
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid items-center h-16 grid-cols-6 space-x-3 lg:h-16 lg:justify-center">
          <div className="cursor-pointer flex col-span-3 justify-start items-center space-x-2">
            <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center">
              <EdugatorLogo />
            </div>
            <h1
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
              }}
              className={`text-xl font-semibold transition font-ambit text-slate-50`}
            >
              Edugator
            </h1>
          </div>
          <div className="col-span-3 h-full flex justify-end items-center">
            {/* Instructors Button */}
            <ActionButton
              onClick={() => {
                router.push("/admin/login");
              }}
              color="blue"
            >
              <span className="font-dm text-sm">Instructor Login</span>
            </ActionButton>
          </div>
        </div>
      </header>
      <div className="h-full bg-nav-darkest flex items-center justify-center">
        <div className="w-[90vw] max-w-[550px] p-10 rounded-lg">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <GraduationCap
                size={36}
                className="text-white !mb-2"
                weight="duotone"
              />
              <h1 className="text-white text-3xl font-semibold font-ambit">
                Student Login
              </h1>
              <p className="text-white/80 text-sm font-dm">
                Please enter your credentials to login.
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-white text-sm font-dm">Email</label>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ufl.edu"
                required
                className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-white text-sm font-dm">Password</label>
              <div className="relative w-full">
                <input
                  name="password"
                  placeholder="•••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  className="bg-nav-dark w-full text-white px-4 py-3 text-sm rounded-md"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showPassword ? (
                    <EyeOpenIcon
                      className="text-white cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeNoneIcon
                      className="text-white cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ActionButton
            color="green"
            containerClassName="w-full !mt-8 mx-auto"
            className="flex justify-center py-[10px] px-4"
          >
            <span className="font-dm font-semibold text-sm">Log In</span>
          </ActionButton>
          <div className="flex justify-center items-center mt-6">
            <span className="text-white/80 text-sm font-dm">
              Don't have an account?&nbsp;
            </span>
            <span
              onClick={() => router.push("/signup")}
              className="text-blue-500 font-medium text-sm font-dm cursor-pointer hover:text-blue-400 transition"
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
