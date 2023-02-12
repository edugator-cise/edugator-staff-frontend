import React from "react";
import {
  ContentBlock,
  ContentState,
} from "draft-js";
import { MultipleChoiceDisplayBlock } from "../components/displayBlockComponents";

export const mediaBlockRenderer = (block: ContentBlock) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};

const Image = ({ src, alt }: { src: string, alt: string }) => {
  if (!!src) {
    return (
      <img
        style={{
          maxWidth: "50%",
        }}
        src={src}
        alt={alt}
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
  }: { src: string; question: string; answers: string[]; correct: number } =
    Object(entity.getData());
  const type = entity.getType();

  let media;

  if (type === "image") {
    media = <Image src={src} alt="add image" />;
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
  }

  return media;
};
