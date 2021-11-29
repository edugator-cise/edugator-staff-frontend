import { Tooltip } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

interface TopicProps {
  icon: any;
  name: string;
  link: string;
  active: boolean;
}

function TopicLink(props: TopicProps) {
  const IconHolder = styled("div")({
    height: 50,
    width: 50,
    backgroundColor: props.active ? "#111827" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
    borderRadius: 10,
    color: props.active ? "#ebebeb" : "#939aa6",
    "&:hover": {
      backgroundColor: "#111827",
      color: "#ebebeb",
      cursor: "pointer",
    },
    WebkitTransition: "background-color 100ms linear, color 100ms linear",
    msTransition: "background-color 100ms linear, color 100ms linear",
    transition: "background-color 100ms linear, color 100ms linear",
  });

  return (
    <Tooltip sx={{ fontSize: 20 }} title={props.name} placement="right">
      <IconHolder>{React.cloneElement(props.icon)}</IconHolder>
    </Tooltip>
  );
}

export default TopicLink;
