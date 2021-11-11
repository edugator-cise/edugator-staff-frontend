import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Stack, Typography, LinearProgress } from "@mui/material";

const ProgressContainer = styled(Paper)(({ theme }) => ({
  height: "60vh",
  borderRadius: theme.spacing(2),
  boxShadow: `0 0 3px 1px ${theme.palette.primary.main}`,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRight: `4px solid ${theme.palette.primary.main}`,
}));

const TallStack = styled(Stack)({
  height: "100%",
});

const ProgressBar = styled(LinearProgress)({
  width: "80%",
});

export function DashboardProgress() {
  return (
    <ProgressContainer>
      <TallStack alignItems="center" justifyContent="center" spacing={4}>
        <Typography variant="h5">Loading Admin Accounts</Typography>
        <ProgressBar />
      </TallStack>
    </ProgressContainer>
  );
}
