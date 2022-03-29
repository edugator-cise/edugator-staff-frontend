import { useState } from "react";
import { EditorState } from "draft-js";
import { EditorContent } from "./EditorContent";

//React state hook
export const TextStack = () => {
  //Declaration of editorList array and setList setter
  const [editorList, setEditorList] = useState([{ id: 0, html: "", content: EditorState.createEmpty() }]);
  const [numberofEditors, setNumberOfEditors] = useState(0);

  //Lets you view editorList content in inspect tab
  console.log(editorList);

  //Used to find specific instance, not used in current code
  //Refer to video, forgot what it's used for

//   const handleServiceChange = (e, index) => {
//     const { name, value } = e.target;
//     console.log(name, value)
//     const list = [...editorList];
//     list[index][name] = value;
//     //setEditorList(list);
//   };

  //Handles remove function
  const handleEditorRemove = (id: number) => {
    console.log("Remove id " + id)
    // remove editor with designated id
    let list = editorList.filter((editor) => {
      return editor.id !== id;
    });
    console.log("Updated List: " + list);
    setEditorList(list);
  };

  const handleEditorAdd = (id: number) => {
    console.log(id);
    setEditorList([...editorList, { id: id, html: "", content: EditorState.createEmpty() }]);
    setNumberOfEditors(numberofEditors + 1)
  };

  const setEditorContent = (id: number, html: string, editorState: EditorState) => {
    console.log(id, html);
    // deep copy array
    let editorsCopy = []
    for (let editor of editorList) {
      editorsCopy.push(editor)
    }
    const index = editorsCopy.findIndex(editor => {
      return editor.id === id;
    })
    editorsCopy[index].html = html;
    editorsCopy[index].content = editorState;

    setEditorList(editorsCopy);
  }

  /*Some key notes:
    <EditorContainer /> renders the text box
    Below it, the if statement for -1 and .length < 4 ensures "add service" button only appears when there's less than 4 text boxes
    editorList.length !== 1 ensures remove button doesn't appear if there's only 1 text box
  */
  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="editor">Editor(s)</label>
        {editorList.map((editor, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <EditorContent id={editor.id} content={editor.content} setContent={setEditorContent} />
              {editorList.length - 1 === index && editorList.length < 4 && (
                <button
                  type="button"
                  onClick={() => {handleEditorAdd(numberofEditors + 1)}}
                  className="add-btn"
                >
                  <span>Add an Editor</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {editorList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => {handleEditorRemove(editor.id)}}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}