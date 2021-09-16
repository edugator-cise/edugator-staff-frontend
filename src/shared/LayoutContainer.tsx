import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";

interface Props {
  pageTitle: string;
}

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: "3rem",
  },
  pageTitle: {
    paddingLeft: "2rem",
  },
  divider: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
});

export const LayoutContainer = ({ pageTitle }: Props) => {
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
            <Typography
              variant="h4"
              component="h2"
              align="left"
              className={classes.pageTitle}
            >
              {pageTitle}
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
