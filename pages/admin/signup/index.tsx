import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import AdminHeader from "components/layouts/AdminHeader";
import { EdugatorLogo } from "components/navigation/navIcons";
import ActionButton from "components/shared/Buttons/ActionButton";
import { useRouter } from "next/router";
import { GraduationCap, HandWaving, SignIn } from "phosphor-react";
import React, { useState, useEffect } from "react";

const AdminSignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-screen min-h-screen h-screen bg-nav-darkest flex flex-col">
      {/* Header */}
      <AdminHeader />
      <div className="h-full bg-nav-darkest flex items-center justify-center">
        <div className="w-[90vw] max-w-[550px] p-10 rounded-lg">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-white text-3xl font-semibold font-ambit">
                Instructor Sign Up
              </h1>
              <p className="text-white/80 text-sm font-dm">
                Sign up to publish your first course.
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
        A
      </div>
    </div>
  );
};
export default AdminSignUpPage;
