import {
  Typography
} from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import theme from "../../shared/theme";
import FeaturesBG from '../../assets/FeaturesBG.svg'
import Diamond from '../../assets/icons8-diamond-100.png'
import FlipChart from '../../assets/icons8-flip-chart-100.png'
import Glasses from '../../assets/icons8-glasses-100.png'

const Holder = styled("div")({
  height: 800,
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
  maxWidth: 1100,
  minWidth: 1000,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
})

const Feature = styled('div')({
  height: '70%',
  width: 300,
  borderRadius: 15,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
  borderTop: '5px solid ' + theme.palette.primary.main,
})

const IconHolder = styled('div')({
  height: 150,
  width: 150,
  position: 'absolute',
  top: -80,
  borderRadius: 75,
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '5px solid ' + theme.palette.primary.main,
})

function LandingFeatures() {
  return (
      <Holder>
          <Typography variant="h3" color="white">Start your journey learning</Typography>
          <Typography variant="h3" color="primary">Computer Science</Typography>
          <Typography variant="body1" color="white" sx={{marginTop: '2em'}}>Understand, analyze, and apply Data Structures and Algorithms in your everyday life.</Typography>
          
        <FeatureHolder>
          <Feature>
            <IconHolder>
              <Typography color="white">
                <img src={Glasses} width={100} height={100} alt="Built for students"/>
              </Typography>
            </IconHolder>
            <Typography variant="h5" color="white" sx={{maxWidth: 200, marginTop: '0.5em', marginBottom: '0.5em'}}><b>Built for students</b></Typography>
            <Typography variant="body2" color="white" sx={{maxWidth: 250}}>Edugator is built to make your life easier. Modules, sample problems, documentation, and more!</Typography>
          </Feature>
          <Feature>
            <IconHolder>
              <Typography color="white">
                <img src={Diamond} width={100} height={100} alt="Modern design"/>
              </Typography>
            </IconHolder>
            <Typography variant="h5" color="white" sx={{maxWidth: 200, marginTop: '0.5em', marginBottom: '0.5em'}}><b>Designed to be modern</b></Typography>
            <Typography variant="body2" color="white" sx={{maxWidth: 250}}>Designed with the latest design trends in mind. Edugator feels modern, minimal, and beautiful.</Typography>
          </Feature>
          <Feature>
            <IconHolder>
              <Typography color="white">
                <img src={FlipChart} width={100} height={100} alt="Lessons for everything"/>
              </Typography>
            </IconHolder>
            <Typography variant="h5" color="white" sx={{maxWidth: 200, marginTop: '0.5em', marginBottom: '0.5em'}}><b>Lessons for everything</b></Typography>
            <Typography variant="body2" color="white" sx={{maxWidth: 250}}>We’ve written extensive documentation for what you need to know for COP3530.</Typography>
          </Feature>
        </FeatureHolder>
      </Holder>
  );
}

export default LandingFeatures;
