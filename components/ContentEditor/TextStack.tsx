import React, { useState } from "react";
import RegistrationForm from "./components/form";
import CustomizedDialogs from "./components/dialog";
import TextEditorContent from "./TextEditorContent";
import {
  text_content,
  image_content,
  mc_content,
  ms_content,
  contentBlock,
} from "./components/exportStructures";
import { ILesson } from "lib/shared/types";

//React state hook
export const TextStack = ({
  rawLesson,
  moduleId,
}: {
  rawLesson?: ILesson;
  moduleId: string;
}) => {
  // if rawlesson is present as a prop, then we are editing a lesson
  //Declaration of serviceList array and setList setter
  const [atomicEntities, setAtomicEntities] = useState([]);
  const [html, setHTML] = useState("");
  const [exportData, setExportData] = useState([]);
  const [rawData, setRawData] = useState(
    rawLesson?.editableContent || {
      blocks: [],
      entityMap: {},
    }
  );

  const entityCallback = (atomicEntities: any, html: string, rawData: any) => {
    setAtomicEntities(atomicEntities);
    setHTML(html);
    updateExportData();
    setRawData(rawData);
  };

  const updateExportData = () => {
    const splitHtml = html.split("<atomic_entity />");
    const rawData = [{ html: splitHtml[0], type: "text" }];
    if (atomicEntities !== undefined)
      atomicEntities.forEach((entity: any, i: number) => {
        rawData.push(entity);
        rawData.push({ html: splitHtml[i + 1], type: "text" });
      });

    const convertedData: any = [];
    rawData.forEach((data: any) => {
      let content;
      const dataType = data.type;
      switch (dataType) {
        case "text":
          content = new contentBlock("text", new text_content(data.html));
          break;

        case "multiple_choice":
          content = new contentBlock(
            "multiple_choice",
            new mc_content(data.data.question, data.data.correct, [
              data.data.answer1,
              data.data.answer2,
              data.data.answer3,
              data.data.answer4,
            ])
          );
          break;

        case "multiple_select":
          content = new contentBlock(
            "multiple_select",
            new ms_content(data.data.question, data.data.answers)
          );
          break;

        case "image":
          content = new contentBlock(
            "image",
            new image_content(
              data.data.src,
              data.data.height,
              data.data.width,
              data.data.alignment || "none"
            )
          );
          break;

        default:
      }

      convertedData.push(content);
    });

    setExportData(convertedData);
    console.log("Content Data Seperated:", convertedData);
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <TextEditorContent
          callbackData={entityCallback}
          rawLesson={rawLesson}
        />
      </div>
      <div className="Popup">
        <CustomizedDialogs title="Publish Learning Content">
          <RegistrationForm
            jsonData={exportData}
            rawData={rawData}
            rawLesson={rawLesson}
            moduleId={moduleId}
          />
        </CustomizedDialogs>
      </div>
    </form>
  );
};
