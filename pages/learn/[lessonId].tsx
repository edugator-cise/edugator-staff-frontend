import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/styles";
import theme from "constants/theme";
import {
  Grid,
  CircularProgress,
  Box,
  Alert,
  Grow,
  Typography,
} from "@mui/material";
import { Node, Markup } from "interweave";
import MultipleChoiceQuestion from "components/LearnPage/MultipleChoiceQuestion";
import ImageBlock from "components/LearnPage/ImageBlock";
import MultipleSelectQuestion from "components/LearnPage/MultipleSelectQuestion";
import PlaygroundLayout from "components/PlaygroundLayout";
import { useRouter } from "next/router";
import { useFetchLesson } from "hooks/useFetchLesson";
import { FetchStatus } from "hooks/types";
import { LessonBlock } from "lib/shared/types";

export default function LearnPage() {
  let questionCount = 1;

  const router = useRouter();
  const params = router.query;

  const {
    status,
    lesson: currentLesson,
    error,
  } = useFetchLesson({
    id: params && params.lessonId ? (params.lessonId as string) : "",
  });

  const LessonHolder = styled("div")({
    width: "80%",
    maxWidth: "1400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 30,
    height: "auto",
    textAlign: "left",
    backgroundColor: "white",
    boxShadow: "inset 0px 8px 5px -5px hsla(0,0%,0%,.1);",
    marginBottom: 100,
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  });

  const LessonHeader = styled("div")({
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: "2px solid lightgrey",
    paddingBottom: 0,
  });

  function transform(node: HTMLElement, children: Node[]): React.ReactNode {
    if (node.tagName === "H1") {
      return (
        <h1
          style={{
            marginBottom: 0,
            fontWeight: 200,
            fontFamily: "DM Serif Display",
            textAlign: "left",
          }}
        >
          {children}
        </h1>
      );
    } else if (node.tagName === "H2") {
      return (
        <h2
          style={{
            marginBottom: 0,
            fontWeight: 200,
            fontFamily: "DM Serif Display",
            textAlign: "left",
          }}
        >
          {children}
        </h2>
      );
    } else if (node.tagName === "H3") {
      return (
        <h3
          style={{
            marginBottom: 0,
            fontWeight: 200,
            fontFamily: "DM Serif Display",
          }}
        >
          <i>{children}</i>
        </h3>
      );
    } else if (node.tagName === "H4") {
      return (
        <h4
          style={{
            marginBottom: 0,
            fontWeight: 200,
            fontFamily: "DM Serif Display",
          }}
        >
          <i>{children}</i>
        </h4>
      );
    } else if (node.tagName === "H5") {
      return (
        <h5
          style={{
            marginBottom: 0,
            fontWeight: 200,
            fontFamily: "DM Serif Display",
          }}
        >
          <i>{children}</i>
        </h5>
      );
    } else if (node.tagName === "H6") {
      return (
        <h5
          style={{
            marginBottom: 0,
            fontWeight: 200,
            fontFamily: "DM Serif Display",
          }}
        >
          <i>{children}</i>
        </h5>
      );
    } else if (node.tagName === "P") {
      return <p style={{ lineHeight: 1.5, color: "#242424" }}>{children}</p>;
    } else if (node.tagName === "PRE") {
      return (
        <code
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: "#242424",
            color: "white",
            alignSelf: "center",
          }}
        >
          {children}
        </code>
      );
    }
  }

  return (
    <>
      {status === FetchStatus.loading ? (
        <Grid container direction="column" sx={{ height: "100vh" }}>
          <Box>
            <CircularProgress />
          </Box>
        </Grid>
      ) : currentLesson === undefined ? (
        <Grid container direction="column" sx={{ height: "100vh" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Lesson not found</Typography>
          </Box>
        </Grid>
      ) : (
        <div
          id="lesson-container"
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            overflowY: "scroll",
          }}
        >
          <LessonHolder>
            <LessonHeader>
              <div className="lesson-title">{currentLesson.title}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "auto",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  className="lesson-subtitle"
                  style={{ color: theme.palette.primary.dark }}
                >
                  <span style={{ color: theme.palette.primary.main }}>
                    Author:{" "}
                  </span>
                  {currentLesson.author}
                </div>
                <div
                  className="lesson-subtitle"
                  style={{ color: theme.palette.primary.dark }}
                ></div>
              </div>
            </LessonHeader>
            {currentLesson.content?.map((block: LessonBlock, i) => {
              console.log(block);
              if (!block || !block.type || !block.data) {
                return null;
              }
              if (block.type === "text") {
                return (
                  <div key={i} style={{ width: "100%" }}>
                    <Markup
                      transform={transform}
                      className="inter"
                      content={JSON.parse(
                        JSON.stringify(block.data.html) || ""
                      )}
                    />
                  </div>
                );
              } else if (block.type === "image") {
                return <ImageBlock key={i} src={block.data.src} />;
              } else if (block.type === "multiple_choice") {
                questionCount++;
                return (
                  <MultipleChoiceQuestion
                    key={i}
                    number={questionCount - 1}
                    image={block.data.image || false}
                    sourcePath={block.data.src}
                    answers={block.data.answers}
                    correctAnswer={block.data.correct}
                    question={block.data.question}
                  />
                );
              } else if (block.type === "multiple_select") {
                questionCount++;
                return (
                  <MultipleSelectQuestion
                    key={i}
                    number={questionCount - 1}
                    answers={block.data.answers}
                    question={block.data.question}
                  />
                );
              }
              return <></>;
            })}
          </LessonHolder>
        </div>
      )}
    </>
  );
}

LearnPage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
