import { Typography } from "@mui/material";
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
});

function Footer() {
  return (
    <FooterHolder>
      <Typography
        variant="body1"
        color={theme.palette.primary.light}
        style={{ marginRight: "8px" }}
      >
        Edugator, 2021
      </Typography>

      <Link to={Routes.PrivacyNotice} style={{ textDecoration: "none" }}>
        <Typography variant="body1" color={theme.palette.primary.light}>
          Privacy Notice
        </Typography>
      </Link>
    </FooterHolder>
  );
}

export default Footer;
