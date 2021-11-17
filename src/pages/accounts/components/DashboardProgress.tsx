import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Stack, Typography, LinearProgress } from "@mui/material";

const ProgressContainer = styled(Paper)({
  height: "60vh",
});

const TallStack = styled(Stack)({
  height: "100%",
});

const ProgressBar = styled(LinearProgress)({
  width: "80%",
});

export function DashboardProgress() {
  return (
    <ProgressContainer elevation={0}>
      <TallStack alignItems="center" justifyContent="center" spacing={4}>
        <Typography variant="h5">Getting Admin Accounts</Typography>
        <ProgressBar />
      </TallStack>
    </ProgressContainer>
  );
}
