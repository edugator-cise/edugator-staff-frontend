import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import ActionButton from "components/shared/Buttons/ActionButton";
import { useRouter } from "next/router";
import { GraduationCap } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AuthLayout from "components/layouts/AuthLayout";
import { useGetOrganizations } from "hooks/org/useGetOrganizations";
import { Field, Form, Formik } from "formik";
import { IRequestSignupAction } from "components/Login/types";
import { useAuth, useSignUp } from "@clerk/nextjs";
import { NextRoutes, Routes } from "constants/navigationRoutes";

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const roles = ["Teaching Assistant", "Student"];

  const [pendingVerification, setPendingVerification] = useState(false);

  const { sessionId } = useAuth();

  useEffect(() => {
    if (sessionId) {
      router.push(NextRoutes.Dashboard);
    }
  }, [sessionId]);

  const handleSubmit = async (values: IRequestSignupAction) => {
    // FIRST CHECK IF USER IS STUDENT AND EXISTS IN COURSE (PLANETSCALE QUERY)
    // IF THEY DONT, SHOW AN ERROR MESSAGE SAYING THEYRE NOT ENROLLED IN ANY COURSES
    // IF THEY DO, CREATE ACCOUNT AND REDIRECT TO VERIFY PAGE

    // IF USER IS INSTRUCTOR, WE NEED TO CHECK THEY EXIST IN THE ORGANIZATION

    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      await signUp!.prepareEmailAddressVerification({ strategy: "email_code" });
      setLoading(false);
      toast.success("Email verification sent");
      // push /verify with email and role, but hide in the url
      router.push(
        `/verify?email=${values.email}&role=${values.role}`,
        `/verify`,
        { shallow: true }
      );
      //setPendingVerification(true);
    } catch (err: any) {
      if (err && err.errors && err.errors[0].message) {
        toast.error(err.errors[0].message);
      }
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async (values: { verificationCode: string }) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp!.attemptEmailAddressVerification({
        code: values.verificationCode,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        setActive &&
          (await setActive({ session: completeSignUp.createdSessionId }));
        router.push(Routes.Landing);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="w-[95vw] max-w-[550px] p-8 rounded-lg">
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          organization: undefined,
          role: "student",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
          <Form className="flex flex-col space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <GraduationCap
                size={36}
                className="text-white !mb-2"
                weight="duotone"
              />

              <h1 className="text-white text-3xl font-semibold font-ambit text-center">
                Welcome to Edugator!
              </h1>
            </div>

            <div className="flex space-x-2 w-full">
              <div className="flex flex-col space-y-1 w-full">
                <label className="text-white text-sm font-dm">First Name</label>
                <Field
                  name="firstName"
                  label="First Name"
                  placeholder="Alberta"
                  margin="normal"
                  fullWidth
                  required
                  className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label className="text-white text-sm font-dm">Last Name</label>
                <Field
                  name="lastName"
                  label="Last Name"
                  placeholder="Gator"
                  margin="normal"
                  fullWidth
                  required
                  className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-white text-sm font-dm">Email</label>
              <Field
                name="email"
                label="Email"
                placeholder="you@ufl.edu"
                margin="normal"
                fullWidth
                required
                className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label className="text-white text-sm font-dm">Password</label>
              <div className="relative w-full">
                <Field
                  name="password"
                  label="Password"
                  placeholder="•••••••"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  fullWidth
                  required
                  className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md w-full"
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

            <ActionButton
              type="submit"
              color="green"
              containerClassName="w-full !mt-8 mx-auto"
              className="flex justify-center py-[10px] px-4"
              /* onClick={() => {
              if (userType === "instructor") {
                // we create account, then bring to onboarding steps
                router.push("/verify");
              } else {
                toast.success(
                  "If user exists in course, redirect to student dashboard, where they see the course theyre enrolled in. If not, error message saying theyre not enrolled in any courses or empty dashboard."
                );
              }
            }} */
            >
              <span className="font-dm font-semibold text-sm">Sign Up</span>
            </ActionButton>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center items-center mt-6">
        <span className="text-white/80 text-sm font-dm">
          Already have an account?&nbsp;
        </span>
        <span
          onClick={() => router.push("/sign-in")}
          className="text-blue-500 font-medium text-sm font-dm cursor-pointer hover:text-blue-400 transition"
        >
          Log In
        </span>
      </div>
      {pendingVerification && (
        <>
          <Formik
            initialValues={{ verificationCode: "" }}
            onSubmit={onPressVerify}
          >
            <Form className="w-full max-w-md -mt-20">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">
                    Verification code
                  </label>
                  <Field
                    name="verificationCode"
                    label="VerificationCode"
                    placeholder="Code..."
                    margin="normal"
                    fullWidth
                    required
                    className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 font-dm !mt-8 h-12 hover:bg-emerald-500 transition text-white flex justify-center items-center text-sm rounded-md"
              >
                <span className="text-white">Verify Email</span>
              </button>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
};

SignUpPage.getLayout = function getLayout(page: any) {
  return <AuthLayout key="signup">{page}</AuthLayout>;
};

export default SignUpPage;
