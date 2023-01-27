import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import theme from "constants/theme";

interface FeatureInfo {
  title: string;
  img: any;
  description: string;
}

const Feature = styled("div")({
  height: "70%",
  width: 300,
  borderRadius: 15,
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)",
  borderTop: "5px solid " + theme.palette.primary.main,
});

const IconHolder = styled("div")({
  height: 150,
  width: 150,
  position: "absolute",
  top: -80,
  borderRadius: 75,
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "5px solid " + theme.palette.primary.main,
});

function FeatureCard(props: FeatureInfo) {
  return (
    <Feature>
      <IconHolder>
        <Typography color="white">
          <img src={props.img} width={100} height={100} alt={props.title} />
        </Typography>
      </IconHolder>
      <Typography
        variant="h5"
        color="white"
        sx={{ maxWidth: 200, marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        <b>{props.title}</b>
      </Typography>
      <Typography variant="body2" color="white" sx={{ maxWidth: 250 }}>
        {props.description}
      </Typography>
    </Feature>
  );
}

export default FeatureCard;
