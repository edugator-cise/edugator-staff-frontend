import {
  EyeNoneIcon,
  EyeOpenIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { EdugatorLogo } from "components/navigation/navIcons";
import ActionButton from "components/shared/Buttons/ActionButton";
import { useRouter } from "next/router";
import { GraduationCap, HandWaving, SignIn } from "phosphor-react";
import React, { useState, useEffect } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import AnimateHeight from "react-animate-height";
import { toast } from "react-hot-toast";
import AdminHeader from "components/layouts/AdminHeader";
import ComponentTransition from "components/shared/ComponentTransition";
import AuthLayout from "components/layouts/AuthLayout";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<"student" | "instructor">("student");

  return (
    <div className="w-[95vw] max-w-[550px] p-8 rounded-lg">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <HandWaving size={36} className="text-white !mb-2" weight="duotone" />
          <h1 className="text-white text-3xl font-semibold font-ambit">
            Welcome to Edugator!
          </h1>
        </div>
        <div className="mt-12 w-full space-y-2">
          <p className="text-white/80 text-sm font-dm w-full text-center">
            I'm signing up as a...
          </p>
          <ul className="relative flex w-full rounded-[10px] border border-slate-700 bg-nav-dark shadow-inner ring-1 ring-slate-800">
            <div
              className={`pointer-events-none absolute top-0 z-0 h-full w-1/2 transition-all ${
                userType === "instructor"
                  ? "translate-x-full p-1"
                  : "translate-x-0 p-1"
              }`}
            >
              <div className="h-full w-full p-px bg-gradient-to-b from-[#648AE8] via-[#648AE8] to-[#2458F2] shadow-[#2458F2]/10 flex items-center group justify-center disabled:from-white disabled:opacity-50 disabled:to-gray-400 enabled:hover:brightness-110 cursor-pointer rounded-md group shadow-lg disabled:cursor-not-allowed enabled:hover:shadow-xl transition duration-200 ease-in-out">
                <div className="h-full w-full rounded-[5px] bg-[#2458F2]"></div>
              </div>
            </div>
            <li className="z-10 w-full">
              <input
                type="radio"
                id="student"
                name="userType"
                checked={userType === "student"}
                onChange={() => setUserType("student")}
                className="peer hidden"
                required
              />
              <label
                htmlFor="student"
                className="inline-flex w-full cursor-pointer items-center justify-center p-4 text-gray-500 transition rounded-l-[9px] hover:bg-slate-500/20 hover:text-gray-400 peer-checked:text-white peer-checked:hover:bg-transparent"
              >
                <div className="block">
                  <div className="w-full text-sm">Student</div>
                </div>
              </label>
            </li>
            <li className="z-10 w-full">
              <input
                type="radio"
                id="instructor"
                name="userType"
                checked={userType === "instructor"}
                onChange={() => setUserType("instructor")}
                className="peer hidden"
              />
              <label
                htmlFor="instructor"
                className="inline-flex w-full cursor-pointer items-center justify-center p-4 text-gray-500 transition rounded-r-[9px] hover:bg-slate-500/20 hover:text-gray-400 peer-checked:text-white peer-checked:hover:bg-transparent"
              >
                <div className="block">
                  <div className="w-full text-sm">Instructor</div>
                </div>
              </label>
            </li>
          </ul>
        </div>
        <AnimateHeight
          duration={300}
          height={userType === "instructor" ? "auto" : 0}
          animateOpacity={true}
        >
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-white text-sm font-dm">Organization</label>
              <select
                id="game"
                value={"uf"}
                onChange={(e) => {}}
                className="block w-full rounded-lg bg-nav-dark text-white p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option
                  value={"uf"}
                  className="flex items-center space-x-2 text-white"
                >
                  UF
                </option>
              </select>
            </div>
          </div>
        </AnimateHeight>
        <div className="flex flex-col space-y-1">
          <label className="text-white text-sm font-dm">Name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alberta"
            required
            className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
          />
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
        onClick={() => {
          if (userType === "instructor") {
            // we create account, then bring to onboarding steps
            router.push("/admin/onboarding");
          } else {
            toast.success(
              "If user exists in course, redirect to student dashboard, where they see the course theyre enrolled in. If not, error message saying theyre not enrolled in any courses or empty dashboard."
            );
          }
        }}
      >
        <span className="font-dm font-semibold text-sm">Sign Up</span>
      </ActionButton>
      <div className="flex justify-center items-center mt-6">
        <span className="text-white/80 text-sm font-dm">
          Already have an account?&nbsp;
        </span>
        <span
          onClick={() => router.push("/admin/onboarding")}
          className="text-blue-500 font-medium text-sm font-dm cursor-pointer hover:text-blue-400 transition"
        >
          Log In
        </span>
      </div>
    </div>
  );
};

SignUpPage.getLayout = function getLayout(page: any) {
  return <AuthLayout key="signup">{page}</AuthLayout>;
};

export default SignUpPage;
