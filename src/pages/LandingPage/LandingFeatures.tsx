import { Typography, Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import theme from "../../shared/theme";
import FeaturesBG from "../../assets/FeaturesBG.svg";
import Diamond from "../../assets/icons8-diamond-100.png";
import FlipChart from "../../assets/icons8-flip-chart-100.png";
import Glasses from "../../assets/icons8-glasses-100.png";
import FeatureCard from "./FeatureCard";

const Holder = styled("div")({
  height: 700,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  WebkitBackgroundSize: "cover",
  backgroundImage: `url(${FeaturesBG})`, //obtained from https://bgjar.com/simple-shiny
  backgroundSize: "13em",
  paddingTop: 170,
  [theme.breakpoints.up("xl")]: {
    paddingTop: 80,
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: 80,
    height: 1500,
  },
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
      <Typography
        variant="body1"
        color="white"
        sx={{ marginTop: "2em", maxWidth: 400 }}
      >
        Understand, analyze, and apply Data Structures and Algorithms in your
        everyday life.
      </Typography>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        style={{ height: "55%", maxWidth: 1200, marginTop: 40 }}
        spacing={1}
      >
        {features.map((feature, index) => {
          return (
            <Grid
              key={index}
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
              style={{
                height: "25em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeatureCard
                title={feature.title}
                img={feature.img}
                description={feature.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </Holder>
  );
}

export default LandingFeatures;
