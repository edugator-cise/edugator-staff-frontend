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
import PlaygroundLayout from "components/PlaygroundLayout/PlaygroundLayout";
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

  function transform(node: HTMLElement, children: Node[]): React.ReactNode {
    return;
  }

  return (
    <>
      {status === FetchStatus.loading ? (
        <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-nav-darkest">
          <CircularProgress />
        </div>
      ) : currentLesson === undefined ? (
        <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-nav-darkest">
          <h1 className="text-2xl font-dm text-slate-900 dark:text-white">
            Lesson not found
          </h1>
        </div>
      ) : (
        /* Page wrapper */
        <div className="w-full h-full bg-slate-200 dark:bg-nav-darkest relative items-center flex flex-col">
          {/* Lesson Page Container */}
          <div className="w-full dark:border-b-slate-700 border-b-slate-300 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-slate-200">
            <p className="text-sm text-slate-800 font-dm font-bold dark:text-white">
              Lessons
              <span className="text-slate-500 dark:text-slate-400 font-normal truncate">
                &nbsp;&nbsp;&gt;&nbsp;&nbsp;{currentLesson?.title}
              </span>
            </p>
          </div>
          <div className="w-full h-auto flex justify-center px-0 md:px-10 overflow-y-auto bg-slate-100 dark:bg-nav-darkest">
            {/* Content Page */}
            <div className="w-full max-w-6xl h-fit pb-20 px-8 bg-white dark:bg-nav-darker markdown flex flex-col space-y-4">
              <header className="border-b-2 pb-2 pt-10 border-emerald-500 w-full flex justify-between items-end text-slate-900 dark:text-white">
                <div className="font-ambit text-4xl font-semibold">
                  {currentLesson.title}
                </div>
                <span className="font-dm">{`Author: ${currentLesson.author}`}</span>
              </header>
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
                        className="space-y-4"
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
                return <React.Fragment key={i} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

LearnPage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
