import React from 'react'
import { styled } from "@mui/material/styles";
import TopicLink from "./TopicLink";
import { Link } from "react-router-dom";
import LightModeLogo from "../assets/LightModeLogo.svg";
import theme from "./theme";
import {
    Stack,
    TreeStructure,
    ArrowsDownUp,
    ShareNetwork,
    Table,
    MathOperations,
    House,
    ListBullets,
  } from "phosphor-react";
  import {
    Box,
    Avatar,
  } from "@mui/material";

interface TopicProps {
    name: string;
    icon: any;
    link: string;
}

interface SidebarProps {
    hidden : boolean
    setHidden : (hidden: boolean) => void;
}

const Sidebar = styled("div")({
    width: 70,
    minWidth: 70,
    height: "100vh",
    backgroundColor: "#1F2937",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
});  

const topics: TopicProps[] = [
    {
      name: "Lists, Stacks, and Queues",
      link: "",
      icon: <Stack weight="fill" size={24} />,
    },
    {
      name: "Trees",
      link: "",
      icon: <TreeStructure weight="fill" size={24} />,
    },
    {
      name: "Heaps",
      link: "",
      icon: <ArrowsDownUp weight="fill" size={24} />,
    },
    {
      name: "Graphs",
      link: "",
      icon: <ShareNetwork weight="fill" size={24} />,
    },
    {
      name: "Sets, Maps, and Hash Tables",
      link: "",
      icon: <Table weight="fill" size={24} />,
    },
    {
      name: "Algorithms",
      link: "",
      icon: <MathOperations weight="fill" size={24} />,
    },
  ];

function TopicSidebar(props: SidebarProps) {
  return (
    <Sidebar>
        <Box
        sx={{
            height: 64,
            width: "100%",
            backgroundColor: theme.palette.secondary.dark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 1,
        }}
        >
        <Link to={"/"}>
            <Avatar src={LightModeLogo} sx={{ height: 40, width: 40 }} />
        </Link>
        </Box>
        <Link to={"/"}>
        <TopicLink
            name="Home"
            active={false}
            icon={<House weight="fill" size={24} />}
            link=""
        />
        </Link>
        <div
        onClick={() => {
            props.setHidden(!props.hidden);
        }}
        >
        <TopicLink
            name="View All"
            active={props.hidden}
            icon={<ListBullets weight="fill" size={24} />}
            link=""
        />
        </div>
        <Box
        sx={{
            height: "1px",
            width: "60%",
            margin: "10px",
            borderBottom: "1px solid #939aa6",
        }}
        />
        {topics.map((topic, i) => {
            //Include this for adding remaining topics to sidebar
            return (
            <TopicLink
                key={i}
                name={topic.name}
                icon={topic.icon}
                link={topic.link}
                active={false}
            />
            );
        })}
        
    </Sidebar>
  )
}

export default TopicSidebar