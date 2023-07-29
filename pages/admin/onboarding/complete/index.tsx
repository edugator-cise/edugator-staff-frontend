import { ArrowRightIcon } from "@radix-ui/react-icons";
import AuthLayout from "components/layouts/AuthLayout";
import ActionButton from "components/shared/Buttons/ActionButton";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Lottie from "lottie-react";
import Checkmark from "public/checkmark.json";
import { NextPage } from "next";

const OnboardingCompleteScreen = () => {
  const router = useRouter();

  return (
    <div className="w-[95vw] max-w-[500px] h-auto p-8 rounded-lg space-y-8 flex flex-col">
      <div className="w-full flex flex-col items-center space-y-4">
        <div className="h-20 w-20 rounded-xl overflow-hidden flex items-center justify-center">
          <Lottie
            animationData={Checkmark}
            loop={false}
            className="min-w-[10rem]"
          />
        </div>
        <h1 className="text-white text-3xl font-semibold font-ambit">
          Let's get learning!
        </h1>
        <p className="text-white/80 text-sm font-dm text-center">
          Your first course is ready to go. Click the button below to head to
          the dashboard.
        </p>
      </div>

      <div className="w-full flex justify-center items-center">
        <Link href="/courses">
          <ActionButton color="green">
            <span className="font-dm text-sm">Dashboard</span>
            <ArrowRightIcon className="ml-2" />
          </ActionButton>
        </Link>
      </div>
    </div>
  );
};

OnboardingCompleteScreen.getLayout = (page: NextPage) => {
  return <AuthLayout key="onboarding">{page}</AuthLayout>;
};

export default OnboardingCompleteScreen;
