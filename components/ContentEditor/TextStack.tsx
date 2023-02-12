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
  fitb_content
} from "./components/exportStructures";

//React state hook
export const TextStack = () => {
  //Declaration of serviceList array and setList setter
  const [atomicEntities, setAtomicEntities] = useState([]);
  const [html, setHTML] = useState("");
  const [exportData, setExportData] = useState([]);
  const [rawData, setRawData] = useState({});

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
            new ms_content(data.data.question, data.data.correct, [
              data.data.answer1,
              data.data.answer2,
              data.data.answer3,
              data.data.answer4,
            ])
          );
          break;

        case "fill_in_the_blank":
          content = new contentBlock(
              "fill_in_the_blank",
              new fitb_content(
                  data.data.questionSegments,
                  data.data.correctAnswers
              )
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
        <TextEditorContent callbackData={entityCallback} />
      </div>
      <div className="Popup">
        <CustomizedDialogs title="Publish Learning Content">
          <RegistrationForm jsonData={exportData} rawData={rawData} />
        </CustomizedDialogs>
      </div>
    </form>
  );
};
