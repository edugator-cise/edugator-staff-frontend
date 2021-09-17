import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Grid,
  makeStyles,
  Box,
} from "@material-ui/core";
import React from "react";

interface Props {
  pageTitle: string;
  children: JSX.Element;
  actionComponents?: Array<React.Component>;
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
  actionComponents,
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
          {actionComponents}
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
