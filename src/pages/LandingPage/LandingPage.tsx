import React, { useEffect, useState } from "react";
import VerticalNavigation from "../../shared/VerticalNavigation";
import LandingHome from "./LandingHome";
import LandingFeatures from "./LandingFeatures";
import LandingTopics from "./LandingTopics";
import Footer from "../../shared/Footer";
import { Grid, Box, CircularProgress } from "@mui/material";
import { IModuleBase } from "../../shared/types";
import { FetchStatus, useFetch } from "../../hooks/useFetch";

function LandingPage() {
  const { status, data } = useFetch<IModuleBase[]>("v1/module");
  const modules =
    data === undefined
      ? []
      : data
          .sort((valueA, valueB) => valueA.number - valueB.number)
          .map((value) => value.name);

  if (status === FetchStatus.loading) {
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Box>
          <CircularProgress />
        </Box>
      </Grid>
    );
  } else {
    return (
      <>
        <VerticalNavigation light modules={modules} />
        <LandingHome />
        <LandingFeatures />
        <LandingTopics />
        <Footer />
      </>
    );
  }
}

export default LandingPage;
