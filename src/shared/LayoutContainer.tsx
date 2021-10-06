import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { MuiStyledOptions } from "@mui/system";
import React from "react";

type ButtonColor = "primary" | "success" | "error" | "info" | "warning";
type ButtonVariant = "text" | "contained" | "outlined";

interface ButtonProps {
  label: string;
  onClick(): void;
  variant?: string;
  color?: string;
}

interface Props {
  pageTitle: string;
  children: JSX.Element;
  actionButtons?: ButtonProps[];
}

const useStyles = makeStyles({
  mainContainer: {
    flexGrow: 1,
    paddingTop: "3rem",
    display: "flex",
    flexDirection: "column",
  },
  pageTitle: {
    paddingLeft: "2rem",
    flexGrow: 1,
  },
  divider: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
});

export const LayoutContainer = ({
  pageTitle,
  children,
  actionButtons = [],
}: Props) => {
  const classes = useStyles();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.mainContainer}>
        <Box display="flex">
          <Typography
            variant="h4"
            component="h2"
            align="left"
            className={classes.pageTitle}
          >
            {pageTitle}
          </Typography>
          {actionButtons.map((button) => (
            <Button
              onClick={button.onClick}
              key={button.label}
              variant={button.variant as ButtonVariant}
              color={button.color as ButtonColor}
            >
              {button.label}
            </Button>
          ))}
        </Box>
        <Divider className={classes.divider} />
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          paddingBottom="2rem"
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};
