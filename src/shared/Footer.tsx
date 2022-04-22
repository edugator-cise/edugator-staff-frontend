import { Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import theme from "./theme";
import { Link } from "react-router-dom";
import { Routes } from "./Routes.constants";


const FooterHolder = styled("div")({
  width: "100%",
  height: 50,
  backgroundColor: theme.palette.primary.dark,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    height: 80
  }
});

function Footer() {
  const md = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <FooterHolder>
      <Typography
        variant={md ? "body2" : "body1"}
        color={theme.palette.primary.light}
        style={{ marginRight: "8px" }}
      >
        © Copyright 2021 Edugator @ University of Florida Research Foundation,
        Inc. All Commercial Rights Reserved.
      </Typography>

      <Link to={Routes.PrivacyNotice} style={{ textDecoration: "none" }}>
        <Typography variant={md ? "body2" : "body1"} color={theme.palette.primary.light}>
          Privacy Terms⠀|⠀
        </Typography>
      </Link>
      <Link to={Routes.FERPA} style={{ textDecoration: "none" }}>
        <Typography variant={md ? "body2" : "body1"} color={theme.palette.primary.light}>
          FERPA⠀|⠀
        </Typography>
      </Link>
      <Link to={Routes.TermsOfUse} style={{ textDecoration: "none" }}>
        <Typography variant={md ? "body2" : "body1"} color={theme.palette.primary.light}>
          Terms of use⠀|⠀Team
        </Typography>
      </Link>
    </FooterHolder>
  );
}

export default Footer;
