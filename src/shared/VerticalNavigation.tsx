import {
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeLogo from "../assets/LightModeLogo.svg";

function VerticalNavigation() {
  const [anchorProjects, setAnchorProjects] = useState<any>(null);
  const [anchorModules, setAnchorModules] = useState<any>(null);
  const [anchorLearn, setAnchorLearn] = useState<any>(null);

  const modulesButton = useRef(null);

  interface menu {
    title: string;
    id: string;
    anchor: any;
    anchorSet: any;
    subitems: { title: string; link: string }[];
  }

  const menus: menu[] = [
    {
      title: "Modules",
      id: "modules",
      anchor: anchorModules,
      anchorSet: setAnchorModules,
      subitems: [
        {
          title: "1. C++ Review",
          link: "",
        },
        {
          title: "2. Arrays and Maps",
          link: "",
        },
        {
          title: "3. Stacks",
          link: "",
        },
      ],
    },
    {
      title: "Projects",
      id: "projects",
      anchor: anchorProjects,
      anchorSet: setAnchorProjects,
      subitems: [
        {
          title: "Linked List",
          link: "",
        },
        {
          title: "AVL Tree",
          link: "",
        },
        {
          title: "PageRank",
          link: "",
        },
        {
          title: "Final Project",
          link: "",
        },
      ],
    },
    {
      title: "Learn",
      id: "learn",
      anchor: anchorLearn,
      anchorSet: setAnchorLearn,
      subitems: [
        {
          title: "Arrays",
          link: "",
        },
        {
          title: "Stacks",
          link: "",
        },
        {
          title: "Queues",
          link: "",
        },
        {
          title: "Heaps",
          link: "",
        },
        {
          title: "Trees",
          link: "",
        },
        {
          title: "Graphs",
          link: "",
        },
        {
          title: "DP",
          link: "",
        },
      ],
    },
  ];

  return (
    <Toolbar style={{paddingLeft: 100, paddingRight: 100, height: 80}}>
      <Avatar alt="Example Alt" src={LightModeLogo} />
      <Typography variant="h5" component="h1"></Typography>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        {menus.map((item) => {
          return (
            <>
              <Button
                key={item.id}
                style={{ marginRight: 30 }}
                aria-controls={item.id}
                aria-haspopup="true"
                onClick={(event) => item.anchorSet(event.currentTarget)}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {item.title}
              </Button>
              <Menu
                id={item.id}
                anchorEl={item.anchor}
                //getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={Boolean(item.anchor)}
                onClose={() => item.anchorSet(null)}
              >
                {item.subitems.map((subitem) => {
                  return (
                    <MenuItem onClick={() => item.anchorSet(null)}>
                      {subitem.title}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          );
        })}
        <Button onClick={() => {}}>Schedule</Button>
      </Grid>
    </Toolbar>
  );
}

export default VerticalNavigation;
