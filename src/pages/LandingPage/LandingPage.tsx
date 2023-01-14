import React, { useEffect, useState } from "react";
import VerticalNavigation from "../../shared/VerticalNavigation";
import LandingHome from "./LandingHome";
import LandingFeatures from "./LandingFeatures";
import LandingTopics from "./LandingTopics";
import Footer from "../../shared/Footer";
import { Grid, Box, CircularProgress } from "@mui/material";
import apiClient from "../../app/common/apiClient";
import { IModuleBase } from "../../shared/types";

function LandingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modules, setModules] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: IModuleBase[] } = await apiClient.get(
        "v1/module"
      );
      const sortedModules = data.sort(
        (valuaA, valubeB) => valuaA.number - valubeB.number
      );
      return sortedModules.map((value) => value.name);
    };

    fetchData()
      .then((values) => {
        setModules(values);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
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
