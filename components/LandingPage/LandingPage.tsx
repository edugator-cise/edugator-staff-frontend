import React, { useEffect } from "react";
import Header from "components/shared/Header";
import LandingHome from "./LandingHome";
import LandingFeatures from "./LandingFeatures";
import LandingTopics from "./LandingTopics";
import Footer from "components/shared/Footer";
import { Grid, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/common/store";
import { requestModules } from "./LandingPageSlice";

function LandingPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.landingPage.isLoading
  );
  const modules = useSelector((state: RootState) => state.landingPage.modules);
  useEffect(() => {
    dispatch(requestModules());
  }, [dispatch]);

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
        <Header light modules={modules} />
        <LandingHome />
        <LandingFeatures />
        <LandingTopics />
        <Footer />
      </>
    );
  }
}

export default LandingPage;
