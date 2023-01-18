import React, { useState, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/common/store";
import { styled } from "@mui/styles";
import theme from "src/shared/theme";
import {
  requestLesson,
  setLessonLoadError,
} from "components/CodeEditor/CodeEditorSlice";
import { Grid, CircularProgress, Box, Alert, Grow } from "@mui/material";
import { Node, Markup } from "interweave";
import MultipleChoiceQuestion from "components/LearnPage/MultipleChoiceQuestion";
import ImageBlock from "components/LearnPage/ImageBlock";
import MultipleSelectQuestion from "components/LearnPage/MultipleSelectQuestion";
import { EmptyState } from "components/CodeEditor/CodeEditorContainer/EmptyState";
import PlaygroundLayout from "components/PlaygroundLayout";
import { useRouter } from "next/router";

export default function LearnPage() {
  let questionCount = 1;

  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;

  const currentLesson = useSelector(
    (state: RootState) => state.codeEditor.currentLesson
  );
  const errorMessage = useSelector(
    (state: RootState) => state.codeEditor.lessonLoadingError
  );
  const isLoadingLesson = useSelector(
    (state: RootState) => state.codeEditor.isLoadingLesson
  );

  useEffect(() => {
    if (params && params.lessonId) {
      dispatch(
        requestLesson({
          lessonId: params.lessonId as string,
        })
      );
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [params]);

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
      {errorMessage.hasError && (
        <Grow in timeout={500}>
          <Alert
            severity="error"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              width: "50%",
              marginTop: 5,
              marginRight: "auto",
              marginLeft: "auto",
              zIndex: 300,
            }}
            onClose={() => {
              dispatch(
                setLessonLoadError({ hasError: false, errorMessage: "" })
              );
            }}
          >
            {errorMessage.errorMessage}
          </Alert>
        </Grow>
      )}
      {isLoadingLesson ? (
        <Grid container direction="column" sx={{ height: "100vh" }}>
          <Box>
            <CircularProgress />
          </Box>
        </Grid>
      ) : currentLesson === undefined ? (
        <EmptyState />
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
            {currentLesson.content?.map((block: any, i) => {
              if (!block || !block.type || !block.content) {
                return null;
              }
              if (block.type === "text") {
                return (
                  <div key={i} style={{ width: "100%" }}>
                    <Markup
                      transform={transform}
                      className="inter"
                      content={JSON.parse(
                        JSON.stringify(block.content.html) || ""
                      )}
                    />
                  </div>
                );
              } else if (block.type === "image") {
                return (
                  <ImageBlock
                    key={i}
                    src={block.content.sourcePath}
                    caption={block.content.caption}
                    height={block.content.height}
                    width={block.content.width}
                    alignment={block.content.alignment}
                  />
                );
              } else if (block.type === "multiple_choice") {
                questionCount++;
                return (
                  <MultipleChoiceQuestion
                    key={i}
                    number={questionCount - 1}
                    image={block.content.image}
                    sourcePath={block.content.sourcePath}
                    answers={block.content.answers}
                    correctAnswer={block.content.correctAnswer}
                    question={block.content.question}
                  />
                );
              } else if (block.type === "multiple_select") {
                questionCount++;
                return (
                  <MultipleSelectQuestion
                    key={i}
                    number={questionCount - 1}
                    answers={block.content.answers}
                    correctAnswer={block.content.correctAnswer}
                    question={block.content.question}
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
