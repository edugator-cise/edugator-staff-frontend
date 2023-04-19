import React from "react";
import { styled } from "@mui/material/styles";
import TopicLink from "components/shared/TopicLink";
import LightModeLogo from "public/LightModeLogo.svg";
import theme from "constants/theme";
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
import { Box, Avatar } from "@mui/material";

interface TopicProps {
  name: string;
  icon: any;
  link: string;
}

interface SidebarProps {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
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

function TopicSidebar({ isHidden, setIsHidden }: SidebarProps) {
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
          overflow: "hidden",
          marginBottom: 1,
        }}
      >
        <a href={"/"}>
          <Avatar
            src={LightModeLogo.src}
            sx={{ height: 41, width: 45, padding: 10 }}
          />
        </a>
      </Box>
      <a href={"/"}>
        <TopicLink
          name="Home"
          active={false}
          icon={<House weight="fill" size={24} />}
          link=""
        />
      </a>
      <div
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        <TopicLink
          name="Exercises"
          active={!isHidden}
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
  );
}

export default TopicSidebar;
