import React from "react";
import {
  EditorState,
  RichUtils,
  ContentBlock,
  AtomicBlockUtils,
  ContentState,
} from "draft-js";
import { MultipleChoiceDisplayBlock, FillInTheBlankDisplayBlock } from "../components/displayBlockComponents";
import { blankAnswer } from "../components/exportStructures";

export const mediaBlockRenderer = (block: ContentBlock) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};

const Image = ({ src }: { src: string }) => {
  if (!!src) {
    return (
      <img
        style={{
          maxWidth: "50%",
        }}
        src={src}
      />
    );
  }
  return null;
};

const Media = ({
  block,
  contentState,
}: {
  block: ContentBlock;
  contentState: ContentState;
}) => {
  console.log("contentState", contentState);
  console.log("block", block);

  const entity = contentState.getEntity(block.getEntityAt(0));
  const {
    src,
    question,
    answers,
    correct,
    questionSegments,
    correctAnswers
  }: { src: string; question: string; answers: string[]; correct: number, questionSegments: string[], correctAnswers: blankAnswer[] } =
    Object(entity.getData());
  const type = entity.getType();

  let media;

  if (type === "image") {
    media = <Image src={src} />;
  } else if (type === "multiple_choice") {
    media = (
      <MultipleChoiceDisplayBlock
        question={question}
        answers={answers}
        correct={correct}
      />
    );
  } else if (type === "multiple_select") {
    media = <></>;
  } else if (type === "fill_in_the_blank") {
    media = (
      <FillInTheBlankDisplayBlock
        questionSegments={questionSegments}
        correctAnswers={correctAnswers}
      />
    )
  }

  return media;
};
