import { Typography, Fade, Grow, Slide, Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import CodingPage from "../../assets/CodingPage.png";
import theme from "../../shared/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { Routes } from "../../shared/Routes.constants";

const Holder = styled("div")({
  height: 800,
  width: "100%",
  paddingTop: 300,
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  //background: 'linear-gradient(transparent, transparent, transparent, white), url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)', fix for safari
  backgroundImage:
    "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
  backgroundSize: "35em",
  [theme.breakpoints.up("xl")]: {
    height: 800,
    flexDirection: "row",
    paddingTop: 0,
  },
  [theme.breakpoints.down("md")]: {
    height: 500,
    paddingTop: 100,
  },
});

const TextHolder = styled("div")({
  width: "80%",
  maxWidth: 600,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("xl")]: {
    textAlign: "left",
    alignItems: "flex-start",
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
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Fade in={true}>
      <Holder>
        <Grow
          in={true}
          style={{ transitionDelay: "50ms" }}
          timeout={{ enter: 1000 }}
        >
          <TextHolder>
            <Typography variant="h2" sx={{ minWidth: 350 }}>
              Learn and practice
            </Typography>
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

            <Typography variant="h2" sx={{ minWidth: 250 }}>
              for COP3530
            </Typography>
            <Typography
              variant="body1"
              sx={{ minWidth: 250 }}
              style={{ marginTop: 10 }}
            >
              Edugator is a place where any UF student can learn to develop
              their programming skills.
            </Typography>
            <ButtonHolder>
              <Link
                to={{
                  pathname: Routes.Code,
                }}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginRight: 15 }}
                >
                  Start Coding
                </Button>
              </Link>
              <Button variant="outlined" color="primary" size="large">
                Learn
              </Button>
            </ButtonHolder>
          </TextHolder>
        </Grow>
        <Slide
          direction="left"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 1000 }}
        >
          <img
            src={CodingPage}
            alt="Edugator Coding Page"
            style={
              md
                ? {
                    width: "80%",
                    maxWidth: 950,
                    borderRadius: 20,
                    marginLeft: xl ? 50 : 0,
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                  }
                : { display: "none" }
            }
          />
        </Slide>
      </Holder>
    </Fade>
  );
}

export default LandingHome;
