import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Grid,
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import React from "react";

interface ButtonProps {
  label: string;
  onClick(): any;
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
            <Button onClick={button.onClick}>{button.label}</Button>
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
