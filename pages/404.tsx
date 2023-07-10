import React from "react";
import { Button, Card, CardActions, CardMedia, Stack } from "@mui/material";
import { Routes } from "constants/navigationRoutes";
import Link from "next/link";
import Image from "next/image";
import { GradientButton } from "components/landing/GradientButton";
import { motion as m } from "framer-motion";

const rotateVals = [20, -20, 7, -7, 2, -2, 0];
const times = [0, 0.1667, 0.3333, 0.5, 0.6667, 0.8333, 1];

const frameVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: rotateVals,
    transition: {
      duration: 5,
      ease: "easeInOut",
      times,
    },
  },
};

const shadowVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [0.85, 1.15, 0.95, 1.05, 0.98, 1.02, 1], // Scale values are adjusted to create a more subtle effect
    transition: {
      duration: 5,
      ease: "easeInOut",
      times: [0, 0.1667, 0.3333, 0.5, 0.6667, 0.8333, 1],
    },
  },
};

export const NotFoundFrame = () => {
  return (
    <div className="relative">
      <m.div
        initial="initial"
        animate="animate"
        variants={frameVariants}
        style={{
          transformOrigin: "top center",
        }}
        className="relative h-64 w-72 z-10"
      >
        <Image
          style={{}}
          src="/images/404Frame.png"
          layout="fill"
          objectFit="contain"
        />
      </m.div>
      <div className="w-full h-10 absolute -translate-x-1/2 !left-1/2">
        <m.div
          className="absolute -bottom-10 h-full w-full mx-auto"
          variants={shadowVariants}
          initial="initial"
          animate="animate"
          style={{
            backgroundColor: "rgba(0,0,0,.3)",
            filter: "blur(10px)",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
};

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-nav-darkest flex-col">
      <NotFoundFrame />

      <m.div className="text-white text-2xl font-semibold font-ambit mt-28">
        Page Not Found
      </m.div>
      <div className="flex justify-end col-span-2 lg:col-span-1 mt-8">
        <Link href={"/"}>
          <button className="btn-gradient">
            <p className="text-white font-dm text-xs text-center whitespace-nowrap">
              Go Back Home
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
