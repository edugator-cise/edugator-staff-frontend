import React from "react";
import {
  EditorState,
  RichUtils,
  ContentBlock,
  AtomicBlockUtils,
  ContentState,
} from "draft-js";
import {
  MultipleChoiceDisplayBlock,
  MultipleSelectDisplayBlock,
} from "../components/displayBlockComponents";
import { ModalAnswer } from "../components/MultipleSelectModal";

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

  const type = entity.getType();

  let media;

  if (type === "image") {
    const { src }: { src: string } = Object(entity.getData());
    media = <Image src={src} />;
  } else if (type === "multiple_choice") {
    const {
      question,
      answers,
      correct,
    }: { question: string; answers: string[]; correct: number } = Object(
      entity.getData()
    );
    media = (
      <MultipleChoiceDisplayBlock
        question={question}
        answers={answers}
        correct={correct}
      />
    );
  } else if (type === "multiple_select") {
    const { question, answers }: { question: string; answers: ModalAnswer[] } =
      Object(entity.getData());
    media = (
      <MultipleSelectDisplayBlock question={question} answers={answers} />
    );
  }

  return media;
};
