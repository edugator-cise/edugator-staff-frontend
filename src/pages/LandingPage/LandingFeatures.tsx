import {
  Container,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import FeaturesBG from '../../assets/FeaturesBG.svg'
import theme from "../../shared/theme";
import { MenuBook, Brush, Code } from '@mui/icons-material/';

const Holder = styled("div")({
  height: 850,
  width: "100%",
  backgroundColor: "red",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  WebkitBackgroundSize: 'cover',
  backgroundImage:
    `url(${FeaturesBG})`, //obtained from https://bgjar.com/simple-shiny
  backgroundSize: "13em",
  paddingTop: 80,
  [theme.breakpoints.up("xl")]: {
    paddingTop: 20,
  },
});

const FeatureHolder = styled("div")({
  height: '55%',
  width: '70%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const Feature = styled('div')({
  height: '80%',
  width: 300,
  borderRadius: 15,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  borderTop: '5px solid ' + theme.palette.primary.main,
})

const IconHolder = styled('div')({
  height: 120,
  width: 120,
  borderRadius: 15,
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

function LandingFeatures() {
  return (
    <Holder>
        <Typography variant="h3" color="white">Start your journey learning</Typography>
        <Typography variant="h3" color="primary">Computer Science</Typography>
        <Typography variant="body1" color="white" sx={{marginTop: 3}}>Understand, analyze, and apply Data Structures and Algorithms in your everyday life.</Typography>
      <FeatureHolder>
        <Feature>
          <IconHolder>
            <Typography color="primary.dark">
              <MenuBook style={{fontSize: 60}}/>
            </Typography>
          </IconHolder>
          <Typography variant="h5"><b>Built for Students</b></Typography>

        </Feature>
        <Feature>
          <IconHolder>
            <Typography color="primary.dark">
              <Brush style={{fontSize: 60}}/>
            </Typography>
          </IconHolder>
          <Typography variant="h5"><b>Designed to be Modern</b></Typography>
        </Feature>
        <Feature>
          <IconHolder>
            <Typography color="primary.dark">
              <Code style={{fontSize: 60}}/>
            </Typography>
          </IconHolder>
          <Typography variant="h5"><b>Lessons for everything</b></Typography>
        </Feature>
      </FeatureHolder>
    </Holder>
  );
}

export default LandingFeatures;
