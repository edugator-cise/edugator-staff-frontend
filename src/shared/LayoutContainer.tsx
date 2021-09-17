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
  gridContainer: {
    paddingTop: "3rem",
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
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
