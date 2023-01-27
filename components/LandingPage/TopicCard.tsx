import { Button, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/styles";
import React, { useRef, useState } from "react";
import theme from "constants/theme";

interface topicInfo {
  name: string;
  staticImg: any;
  animatedImg: any;
  description: string;
  position: string;
  zIndex: number;
}

const Topic = styled("div")({
  height: 300,
  width: 250,
  backgroundColor: "white",
  borderRadius: 15,
  boxShadow: "rgba(149, 157, 165, 0.3) 0px 8px 24px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

function TopicCard(props: topicInfo) {
  const gif = useRef<any>(null);
  const [hover, setHover] = useState<boolean>(false);
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Topic
      onMouseOver={(e) => {
        gif.current.src = props.animatedImg;
        setHover(true);
      }}
      onMouseOut={() => {
        gif.current.src = props.staticImg;
        setHover(false);
      }}
      style={
        lg
          ? props.position === "top"
            ? hover
              ? {
                  transform: "translateY(0px) translateX(-100px)",
                  WebkitTransform: "translateY(0px) translateX(-100px)",
                  transition: "transform 800ms",
                  zIndex: props.zIndex,
                }
              : {
                  transform: "translateY(100px) translateX(-100px)",
                  WebkitTransform: "translateY(100px) translateX(-100px)",
                  transition: "transform 800ms",
                  zIndex: props.zIndex,
                }
            : hover
            ? {
                transform: "translateY(0px) translateX(100px)",
                WebkitTransform: "translateY(0px) translateX(100px)",
                transition: "transform 800ms",
                zIndex: props.zIndex,
              }
            : {
                transform: "translateY(-80px) translateX(100px)",
                WebkitTransform: "translateY(-80px) translateX(100px)",
                transition: "transform 800ms",
                zIndex: props.zIndex,
              }
          : {}
      }
    >
      <img
        height={100}
        width={100}
        src={props.staticImg}
        ref={gif}
        alt={`${props.name} gif`}
      />
      <Typography
        variant="h5"
        color={theme.palette.secondary.main}
        sx={{ maxWidth: "80%" }}
      >
        <b>{props.name}</b>
      </Typography>
      <Typography
        variant="body2"
        color={theme.palette.secondary.main}
        sx={{ maxWidth: "80%", paddingBottom: 10 }}
      >
        {props.description}
      </Typography>
      <Button
        variant="contained"
        size="small"
        sx={{ width: "80%", position: "absolute", bottom: 20 }}
      >
        Learn
      </Button>
    </Topic>
  );
}

export default TopicCard;
