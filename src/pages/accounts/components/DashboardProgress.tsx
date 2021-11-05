import React from "react";
import { styled } from "@mui/system";
import { Paper, Stack, Typography, LinearProgress } from "@mui/material";

const ProgressContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "40vh",
  margin: theme.spacing(4),
  padding: theme.spacing(3),
}));

const TallStack = styled(Stack)({
  height: "100%",
});

const ProgressBar = styled(LinearProgress)({
  width: "80%",
});

export function DashboardProgress() {
  return (
    <ProgressContainer elevation={3}>
      <TallStack alignItems="center" justifyContent="space-evenly">
        <Typography variant="h5">
          Getting Admin Accounts from the Database
        </Typography>
        <ProgressBar />
      </TallStack>
    </ProgressContainer>
  );
}
