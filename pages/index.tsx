import React, { useEffect } from "react";
import Header from "components/shared/Header";
import LandingHome from "components/LandingPage/LandingHome";
import LandingFeatures from "components/LandingPage/LandingFeatures";
import LandingTopics from "components/LandingPage/LandingTopics";
import { requestModules } from "components/LandingPage/LandingPageSlice";
import { Grid, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/common/store";
import Footer from "components/shared/Footer";

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
