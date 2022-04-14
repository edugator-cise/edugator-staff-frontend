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

  //Used to find specific instance, not used in current code
  //Refer to video, forgot what it's used for

  // const handleServiceChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...serviceList];
  //   list[index][name] = value;
  //   setServiceList(list);
  // };

  //Handles remove function
  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const HTMLCallback = (html) => {
    setHTML(html);
    console.log(html);
  }

  /*Some key notes:
    <EditorContainer /> renders the text box
    Below it, the if statement for -1 and .length < 4 ensures "add service" button only appears when there's less than 4 text boxes
    serviceList.length !== 1 ensures remove button doesn't appear if there's only 1 text box
  */
  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">Service(s)</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <TextEditorContent giveHTML={HTMLCallback} />
              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Add a Service</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="Popup">
        <CustomizedDialogs title="Publish Learning Content">
          <RegistrationForm html={html}/>
        </CustomizedDialogs>
      </div>
    </form>
  );
}
