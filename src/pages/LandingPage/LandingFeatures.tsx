import { Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import theme from "../../shared/theme";
import FeaturesBG from "../../assets/FeaturesBG.svg";
import Diamond from "../../assets/icons8-diamond-100.png";
import FlipChart from "../../assets/icons8-flip-chart-100.png";
import Glasses from "../../assets/icons8-glasses-100.png";
import FeatureCard from "./FeatureCard";

const Holder = styled("div")({
  height: 800,
  width: "100%",
  backgroundColor: "red",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  WebkitBackgroundSize: "cover",
  backgroundImage: `url(${FeaturesBG})`, //obtained from https://bgjar.com/simple-shiny
  backgroundSize: "13em",
  paddingTop: 80,
  [theme.breakpoints.up("xl")]: {
    paddingTop: 20,
  },
});

const FeatureHolder = styled("div")({
  height: "55%",
  width: "70%",
  maxWidth: 1100,
  minWidth: 1000,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

function LandingFeatures() {
  const features = [
    {
      title: "Built for students",
      img: Glasses,
      description:
        "Edugator is built to make your life easier. Modules, sample problems, documentation, and more!",
    },
    {
      title: "Designed to be modern",
      img: Diamond,
      description:
        "Designed with the latest design trends in mind. Edugator feels modern, minimal, and beautiful.",
    },
    {
      title: "Lessons for everything",
      img: FlipChart,
      description:
        "We’ve written extensive documentation for what you need to know for COP3530.",
    },
  ];

  return (
    <Holder>
      <Typography variant="h3" color="white">
        Start your journey learning
      </Typography>
      <Typography variant="h3" color="primary">
        Computer Science
      </Typography>
      <Typography variant="body1" color="white" sx={{ marginTop: "2em" }}>
        Understand, analyze, and apply Data Structures and Algorithms in your
        everyday life.
      </Typography>

      <FeatureHolder>
        {features.map((feature, index) => {
          return (
            <FeatureCard
              key={index}
              title={feature.title}
              img={feature.img}
              description={feature.description}
            />
          );
        })}
      </FeatureHolder>
    </Holder>
  );
}

export default LandingFeatures;
