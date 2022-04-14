import React, { Component, useState } from "react";
import RegistrationForm from "./components/form";
import CustomizedDialogs from "./components/dialog";
import TextEditorContent from "./TextEditorContent";

//React state hook
export const TextStack = () => {
  //Declaration of serviceList array and setList setter
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [html, setHTML] = useState("");

  //Lets you view serviceList content in inspect tab
  console.log(serviceList);

  const HTMLCallback = (html) => {
    setHTML(html);
    console.log(html);
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">Form Content</label>
        <TextEditorContent giveHTML={HTMLCallback} />
      </div>
      <div className="Popup">
        <CustomizedDialogs title="Publish Learning Content">
          <RegistrationForm html={html} />
        </CustomizedDialogs>
      </div>
    </form>
  );
};
