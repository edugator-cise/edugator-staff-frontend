import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";
import { FetchStatus } from "./types";
import {
  ILesson,
  ImageEntity,
  LessonDisplay,
  MultipleChoiceEntity,
  MultipleSelectEntity,
  TextContent,
} from "lib/shared/types";
import { apiRoutes } from "constants/apiRoutes";
import toast from "react-hot-toast";

export const useFetchLesson = ({ id }: { id: string }) => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [lesson, setLesson] = useState<LessonDisplay | undefined>(undefined);
  const [rawLesson, setRawLesson] = useState<ILesson | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: ILesson } = await apiClient.get(
        apiRoutes.student.getLesson(id)
      );
      return data;
    };
    if (!id) return;
    fetchData()
      .then((values) => {
        if (values) {
          const transformed = transformLesson(values);
          setLesson(transformed);
          setRawLesson(values);
          console.log(values);
          console.log(transformed);
        }
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        // lol idk what else to do here
        // theres an issue on refresh of a lesson page
        if (e.message.includes("Cannot read properties of undefined")) {
          return;
        }

        toast.error(e.message);
        // dispatch(setRunningSubmission(false)); TODO: handle this, should we move this to global state?
        setStatus(FetchStatus.failed);
        console.log(e);
        setError(e);
      });
    return () => {
      setStatus(FetchStatus.loading);
    };
  }, [id]);
  return { status, lesson, error, rawLesson };
};

/* export function isEntityOfType<T extends { type: string }>(
  entity: any,
  type: string
): entity is T {
  return entity.type === type;
} */

// convert the lesson into a cohesive block structure
const transformLesson = (lesson: ILesson) => {
  // iterate through lesson.content
  // If block is of type multiple_choice, multiple_select, or image:
  // get values from lesson.entityMap

  const displayLesson: LessonDisplay = {
    id: lesson._id || "",
    title: lesson.title,
    author: lesson.author,
    content: [],
  };

  console.log(lesson.content);
  console.log(lesson.entityMap);
  for (let i = 0; i < lesson.content.length; i++) {
    const block = lesson.content[i];
    console.log(block);
    if (!block || !block.type) {
      console.log("block ignored");
      continue;
      // ignore this block
    } else if (block?.type === "multiple_choice") {
      const content = block.content;
      console.log("multiple choice content", content);
      displayLesson.content.push({
        type: "multiple_choice",
        data: {
          question: content.question,
          answers: content.answers,
        },
      });
    } else if (block?.type === "multiple_select") {
      console.log("here");
      const content = block.content;
      //console.log(entity);
      displayLesson.content.push({
        type: "multiple_select",
        data: {
          question: content.question,
          answers: content.answers,
        },
      });
    } else if (block?.type === "image") {
      console.log("image");
      const content = block.content;
      displayLesson.content.push({
        type: "image",
        data: {
          src: content.sourcePath,
          //todo: add alt text and alignment to image entity
        },
      });
    } else if (block?.type === "text") {
      if (!block.content) {
        console.log("no content");
        continue;
      }
      displayLesson.content.push({
        type: "text",
        data: {
          html: block.content.html || "",
        },
      });
    }
  }
  console.log(displayLesson);
  return displayLesson;
};
