import PlaygroundLayout from "components/PlaygroundLayout/PlaygroundLayout";
import { ReactNode } from "react";
import { Container, Typography, Grow } from "@mui/material";
import Lottie from "lottie-react";
import CrocodileOnAScooter from "public/crocodileonascooter.json";

export default function LearnPage() {
  return (
    <div className="flex items-center justify-center w-full flex-col h-full bg-slate-50 dark:bg-nav-darkest">
      <Lottie
        animationData={CrocodileOnAScooter}
        style={{
          width: 400,
        }}
      />
      <h1 className="text-3xl font-dm font-semibold mb-4 text-slate-900 dark:text-slate-200">
        Welcome to Edugator!
      </h1>
      <p className="text-slate-900 dark:text-slate-300">
        Select an exercise to get started.
      </p>
    </div>
  );
}

LearnPage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
