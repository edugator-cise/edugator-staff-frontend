import { Typography, Fade, Grow, Slide, Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import LightModeLogo from "../../assets/LightModeLogo.svg";
import CodingPage from "../../assets/CodingPage.png";
import theme from "../../shared/theme";

const Holder = styled("div")({
  height: 800,
  width: "100%",
  paddingTop: "18vh",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: 'linear-gradient(transparent, transparent, transparent, white, white), url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)',
  backgroundSize: "35em",
  [theme.breakpoints.up("xl")]: {
    height: 800,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
});

const TextHolder = styled("div")({
  width: "50%",
  maxWidth: 600,
  display: "flex",
  //backgroundColor: 'red',
  flexDirection: "column",
  textAlign: "center",
  [theme.breakpoints.up("xl")]: {
    textAlign: "left",
  },
});

const ButtonHolder = styled("div")({
  width: "auto",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
  marginBottom: 100,
  [theme.breakpoints.up("xl")]: {
    justifyContent: "flex-start",
  },
});

function LandingHome() {
  var ReactRotatingText = require("react-rotating-text");

  return (
    <Fade in={true}>
      <Holder>
        <Grow in={true} style={{ transitionDelay: "50ms" }} timeout={{enter: 1000}}>
          <TextHolder>
            <Typography variant="h2">Learn and practice</Typography>
            <Typography variant="h2" color="primary">
              <ReactRotatingText
                items={[
                  "arrays...",
                  "balanced trees...",
                  "directed graphs...",
                  "algorithms...",
                ]}
              />
            </Typography>

            <Typography variant="h2">for COP3530</Typography>
            <Typography variant="body1" style={{ marginTop: 10 }}>
              Edugator is a place where any UF student can learn to develop
              their programming skills.
            </Typography>
            <ButtonHolder>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginRight: 15 }}
              >
                Start Coding
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Learn
              </Button>
            </ButtonHolder>
          </TextHolder>
        </Grow>
        <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={{enter: 1000}}>
          <img
            src={CodingPage}
            style={{
              height: "32em",
              borderRadius: 20,
              marginLeft: 50,
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              //boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
              //boxShadow: 'rgba(3, 102, 214, 0.4) 5px 5px, rgba(3, 102, 214, 0.3) 10px 10px, rgba(3, 102, 214, 0.2) 15px 15px, rgba(3, 102, 214, 0.1) 20px 20px, rgba(3, 102, 214, 0.05) 25px 25px'
            }}
          />
        </Slide>
      </Holder>
    </Fade>
  );
}

export default LandingHome;
