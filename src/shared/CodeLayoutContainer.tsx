import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Box,
  Paper,
  Grid
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


interface ButtonProps {
  label: string;
  onClick(): any;
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

interface Props {
  sideNav: JSX.Element
}

export const CodeLayoutContainer = ({ sideNav }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0}>
        <Grid item xs={12} md={1}>
          <Item>xs=12 md=1</Item>  
        </Grid>
        <Grid item xs={12} md={2}>
          {sideNav}
        </Grid>
        <Grid item xs={12} md={9}>
          <Item>xs=12, md=9</Item>
        </Grid>
      </Grid>
    </Box>
  );
};
