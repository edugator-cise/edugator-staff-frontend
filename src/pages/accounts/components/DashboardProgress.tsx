import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Stack, Typography, LinearProgress } from "@mui/material";

const ProgressContainer = styled(Paper)(({ theme }) => ({
  height: "60vh",
  borderRadius: theme.spacing(4),
  backgroundColor: theme.palette.primary.light,
  boxShadow: `0 0 5px 2px ${theme.palette.primary.light}`,
}));

const ProgressPaper = styled(Paper)(({ theme }) => ({
  height: "60%",
  width: "80%",
  borderRadius: theme.spacing(6),
}));

const TallStack = styled(Stack)({
  height: "100%",
});

const ProgressBar = styled(LinearProgress)({
  width: "80%",
});

export function DashboardProgress() {
  return (
    <ProgressContainer elevation={0}>
      <TallStack alignItems="center" justifyContent="center">
        <ProgressPaper elevation={3}>
          <TallStack alignItems="center" justifyContent="center" spacing={4}>
            <Typography variant="h5">Getting Admin Accounts</Typography>
            <ProgressBar />
          </TallStack>
        </ProgressPaper>
      </TallStack>
    </ProgressContainer>
  );
}
