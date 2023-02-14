import { Typography, Button, Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import theme from "constants/theme";
import TopicCard from "./TopicCard";
import useMediaQuery from "@mui/material/useMediaQuery";

const Holder = styled("div")({
  height: "auto",
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingTop: 80,
  backgroundImage:
    "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
  backgroundSize: "35em",
  paddingBottom: 90,
});

const TopicList = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "80%",
  maxWidth: 1000,
  minWidth: 800,
});

function LandingTopics() {
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const topics = [
    {
      name: "Sorting",
      description: "Sort through arrays and vectors with different conditions",
      staticImg: "/icons8-alphabetical-sorting-100.png",
      animatedImg: "/icons8-alphabetical-sorting.gif",
    },
    {
      name: "Linked Lists",
      description: "Connected data sets in node format",
      staticImg: "/icons8-link-100.png",
      animatedImg: "/icons8-link.gif",
    },
    {
      name: "Stacks and Queues",
      description: "An intro about stacks and queues",
      staticImg: "/icons8-menu-100.png",
      animatedImg: "/icons8-menu.gif",
    },
    {
      name: "Heaps",
      description: "Fundamentals of min and max heap and priority queue",
      staticImg: "/icons8-expand-arrow-100.png",
      animatedImg: "/icons8-expand-arrow.gif",
    },
    {
      name: "Sets and Maps",
      description: "Module on understanding the type of sets and maps",
      staticImg: "/icons8-thumbnail-view-100.png",
      animatedImg: "/icons8-thumbnail-view.gif",
    },
    {
      name: "Recursion",
      description: "Everything recursive happens recursively",
      staticImg: "/icons8-replay-100.png",
      animatedImg: "/icons8-replay.gif",
    },
  ];

  return (
    <Holder>
      <Typography variant="h3" color={theme.palette.secondary.main}>
        Choose your learning path by topic{" "}
      </Typography>
      <Typography
        variant="body1"
        color={theme.palette.secondary.main}
        sx={{ marginTop: "2em", marginBottom: "2em", maxWidth: 400 }}
      >
        Browse the available course topics, choose your favourite one, and start
        learning.{" "}
      </Typography>

      {lg ? (
        <>
          <TopicList style={{ paddingTop: 30 }}>
            {topics.slice(0, 3).map((topic, index) => (
              <TopicCard
                key={index}
                name={topic.name}
                description={topic.description}
                staticImg={topic.staticImg}
                animatedImg={topic.animatedImg}
                position="top"
                zIndex={index}
              />
            ))}
          </TopicList>
          <TopicList>
            {topics.slice(3, 6).map((topic, index) => (
              <TopicCard
                key={index}
                name={topic.name}
                description={topic.description}
                staticImg={topic.staticImg}
                animatedImg={topic.animatedImg}
                position="bottom"
                zIndex={index}
              />
            ))}
          </TopicList>
        </>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          maxWidth={850}
          spacing={2}
        >
          {topics.map((topic, index) => (
            <Grid
              item
              key={index}
              lg={6}
              md={4}
              sm={6}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TopicCard
                name={topic.name}
                description={topic.description}
                staticImg={topic.staticImg}
                animatedImg={topic.animatedImg}
                position="top"
                zIndex={index}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Button variant="text" sx={{ color: theme.palette.primary.main }}>
        Browse all Topics
      </Button>
    </Holder>
  );
}

export default LandingTopics;
