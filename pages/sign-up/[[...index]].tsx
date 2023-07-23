import { Field, Form, Formik } from "formik";
import { useSignUp } from "@clerk/nextjs";
import { useGetAllOrganization } from "hooks/organization/useGetAllOrganization";
import { IRequestLoginAction } from "components/Login/types";
import { useRouter } from "next/router";
import { useState, ReactNode } from "react";
import AdminHeader from "components/layouts/AdminHeader";
import { NextRoutes, Routes } from "constants/navigationRoutes";
import toast from "react-hot-toast";

export default function SignUpPage(): React.ReactElement {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    data: organizations,
    isLoading: organizationLoading,
    isFetching: organizationFetching,
    isError: organizationError,
  } = useGetAllOrganization();
  const roles = ["Teaching Assistant", "Student"]

  const Link = ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href} className="text-black hover:underline">
      {children}
    </a>
  );
  
  const handleSubmit = async (values: IRequestLoginAction) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      await signUp!.create({
        emailAddress: values.username,
        password: values.password,
      });

      await signUp!.prepareEmailAddressVerification({ strategy: "email_code"});
      setLoading(false);
      toast.success('Email verification sent')
      setPendingVerification(true);
    } catch(err: any) {
      if (err && err.errors && err.errors[0].message) {
        toast.error(err.errors[0].message)
      }
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  }

  const onPressVerify = async (values: { verificationCode: string}) => {
    if (!isLoaded) {
      return;
    }
    
    try {
      const completeSignUp = await signUp!.attemptEmailAddressVerification({
        code: values.verificationCode
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        setActive && await setActive({ session: completeSignUp.createdSessionId })
        router.push(Routes.Landing);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }
  return (
    <div className="w-full h-screen min-h-screen flex flex-col">
      <AdminHeader />
      <div className="h-full bg-nav-darkest flex flex-col items-center justify-center">
        {!pendingVerification && (
          <>
            <Formik
            initialValues={{ username: "", password: "", firstName: "", lastName: "", organization: "", role: ""}}
            onSubmit={handleSubmit}
            >
            <Form className="w-full max-w-md -mt-20">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-white text-3xl font-ambit">
                    Sign Up
                  </h1>
                  <p className="text-white/80 text-sm font-dm">
                    to continue to Edugator
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">First Name</label>
                  <Field
                    name="firstName"
                    placeholder="Jane"
                    label="FirstName"
                    margin="normal"
                    fullWidth
                    required
                    className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">Last Name</label>
                  <Field
                    name="lastName"
                    placeholder="Doe"
                    label="LastName"
                    margin="normal"
                    fullWidth
                    required
                    className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">Organization</label>
                  <Field
                    as="select"
                    name="organization"
                    label="Organization"
                    margin="normal"
                    fullWidth
                    required
                    className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                  >
                    {organizations && organizations.map((value) => (
                      <option value={value.id} key={value.id}>{value.name}</option>
                    ))}
                  </Field>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">Role</label>
                  <Field
                    as="select"
                    name="role"
                    label="Role"
                    margin="normal"
                    fullWidth
                    required
                    className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                  >
                    {roles.map((value) => (
                      <option value={value}>{value}</option>
                    ))}
                  </Field>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">Username</label>
                  <Field
                    name="username"
                    label="Username"
                    placeholder="you@ufl.edu"
                    margin="normal"
                    fullWidth
                    required
                    className="bg-nav-dark text-white px-4 py-3 text-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-white text-sm font-dm">Password</label>
                  <Field
                    name="password"
                    placeholder="•••••••"
                    label="Password"
                    type="password"
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
                {loading ? (
                  <div className="bouncing-loader py-2">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <span className="text-white">Sign Up</span>
                )}
              </button>
            </Form>
          </Formik>
          <div className="flex flex-row space-x-2 m-2">
            <p className="text-white/80 text-md font-dm">
                Have an account?
            </p>
            <Link href={NextRoutes.SignIn}>
              Sign In
            </Link>
          </div>
        </>
        )}
        {pendingVerification && (
          <>
            <Formik
              initialValues={{ verificationCode: ""}}
              onSubmit={onPressVerify}
            >
            <Form className="w-full max-w-md -mt-20">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-1">
                    <label className="text-white text-sm font-dm">Verification code</label>
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
    </div>
  );
}
