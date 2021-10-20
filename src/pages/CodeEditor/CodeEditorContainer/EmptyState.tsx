import React from "react";
import { Container, Typography, Fade } from "@mui/material";
import DeveloperIcon from "../../../assets/developer_activity.svg";
import { styled } from "@mui/material/styles";

const DeveloperImage = styled("img")(
  ({ theme }) => `
  height: 50%;
  width: 50%;
  margin-bottom: -${theme.spacing(4)}
`
);
export const EmptyState = () => {
  return (
    <Container
      sx={{ height: "100vh - 64px", display: "flex", justifyContent: "center" }}
    >
      <Fade in appear>
        <div style={{ textAlign: "center" }}>
          <DeveloperImage src={DeveloperIcon} />
          <div>
            <Typography variant="h4">Get Started</Typography>
          </div>
          <Typography variant="body1">
            Choose a problem on the navigation bar to start!
          </Typography>
        </div>
      </Fade>
    </Container>
  );
};
