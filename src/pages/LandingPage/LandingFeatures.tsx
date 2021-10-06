import {
  Container,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";

const Holder = styled("div")({
  height: 800,
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage:
    'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
  backgroundSize: "13em",
});

function LandingFeatures() {
  return <div>Hello</div>;
}

export default LandingFeatures;
