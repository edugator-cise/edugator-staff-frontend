import React, { useState } from "react";
import RegistrationForm from "./components/form";
import CustomizedDialogs from "./components/dialog";
import TextEditorContent from "./TextEditorContent";
import { text_content, image_content, mc_content, ms_content, contentBlock } from "./components/exportStructures"

//React state hook
export const TextStack = () => {
  //Declaration of serviceList array and setList setter
  const [atomicEntities, setAtomicEntities] = useState([]);
  const [html, setHTML] = useState("");
  const [exportData, setExportData] = useState([]);

  const entityCallback = (atomicEntities: any, html: string) => {
    setAtomicEntities(atomicEntities)
    setHTML(html);
    updateExportData();
  };

  const updateExportData = () => {
    let splitHtml = html.split("<atomic_entity />");
    let rawData = [{html: splitHtml[0], type: 'TEXT'}];
    if (atomicEntities !== undefined)
      atomicEntities.forEach((entity: any, i: number) => {
        rawData.push(entity);
        rawData.push({html: splitHtml[i+1], type: 'TEXT'});
      })

    let convertedData: any = [];
    rawData.forEach((data: any) => {
      let content;
      let dataType = data.type
      switch(dataType) {
        case "TEXT":
          content = new contentBlock("text", new text_content(data.html));
          break

        case "MULTIPLE_CHOICE":
          content = new contentBlock("MC", new mc_content(data.data.question, data.data.correct, [data.data.answer1, data.data.answer2, data.data.answer3, data.data.answer4]));
          break;

        case "MULTIPLE_SELECT":
          content = new contentBlock("MS", new ms_content(data.data.question, data.data.correct, [data.data.answer1, data.data.answer2, data.data.answer3, data.data.answer4]));
          break;

        case "IMAGE":
          content = new contentBlock("image", new image_content(data.data.src, data.data.height, data.data.width, data.data.alignment || "none"));
          break;

        default:
      };

      convertedData.push(content);

    });

    setExportData(convertedData);
    console.log("Content Data Seperated:", convertedData)
  }

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <TextEditorContent callbackData={entityCallback} />
      </div>
      <div className="Popup">
        <CustomizedDialogs title="Publish Learning Content">
          <RegistrationForm jsonData={exportData} />
        </CustomizedDialogs>
      </div>
    </form>
  );
};
