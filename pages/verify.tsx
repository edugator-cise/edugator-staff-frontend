import AuthLayout from "components/layouts/AuthLayout";
import { NextPage } from "next";
import { IdentificationBadge } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { RootState } from "lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorage } from "lib/auth/LocalStorage";
import { useRouter } from "next/router";
import AuthCode from "react-auth-code-input";
import ActionButton from "components/shared/Buttons/ActionButton";
import Link from "next/link";

const VerifyPage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.login);
  const router = useRouter();
  const [token, setToken] = useState(LocalStorage.getToken());
  const [code, setCode] = useState("");

  const handleOnCodeChange = (code: string) => {
    setCode(code);
  };

  return (
    <div className="w-[95vw] max-w-[550px] p-8 rounded-lg">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col items-center space-y-2">
          <IdentificationBadge
            size={36}
            className="text-white !mb-2"
            weight="duotone"
          />
          <h1 className="text-white text-3xl font-semibold font-ambit">
            Verify your account
          </h1>
          <p className="text-white/80 text-sm font-dm text-center">
            We've sent a code to your email - INSERT_EMAIL_HERE. Please enter
            the code below.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col !space-y-8 mt-12 mb-2">
        <AuthCode
          allowedCharacters="numeric"
          onChange={handleOnCodeChange}
          containerClassName="flex space-x-3"
          inputClassName="w-full px-4 py-7 rounded-lg border border-slate-700 bg-nav-dark text-white text-xl font-bold font-dm text-center"
        />
        <Link href="/admin/onboarding">
          <ActionButton
            color="green"
            type="submit"
            containerClassName="w-full mx-auto"
            className="flex justify-center py-[10px] px-4"
          >
            <span className="text-white">Verify</span>
          </ActionButton>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-6">
        <span className="text-white/80 text-sm font-dm">
          Didn't receive a code?&nbsp;
        </span>
        <span
          onClick={() => router.push("/signup")}
          className="text-blue-500 font-medium text-sm font-dm cursor-pointer hover:text-blue-400 transition"
        >
          Resend
        </span>
      </div>
    </div>
  );
};

VerifyPage.getLayout = (page: NextPage) => (
  <AuthLayout key="verify">{page}</AuthLayout>
);

export default VerifyPage;
