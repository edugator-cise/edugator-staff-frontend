import { useState, useEffect } from "react";
import {
  requestAddContent,
  requestUpdateContent,
  updateContentEditor,
  updateMetadata,
} from "../contentEditorPageSlice";
import { useAppSelector } from "../../../app/common/hooks";
import { useDispatch } from "react-redux";
import "./FormStyles.css";

interface ExportData {
  title: string;
  author: string;
  content: any[];
  editableContent: any;
}

export const RegistrationForm = ({
  jsonData,
  rawData,
}: {
  jsonData: any;
  rawData: any;
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  const contentId = useAppSelector(
    (state) => state.contentEditorPage.contentId
  );

  const contentTitle = useAppSelector(
    (state) => state.contentEditorPage.metadata.title
  );

  const contentAuthor = useAppSelector(
    (state) => state.contentEditorPage.metadata.author
  );

  useEffect(() => {
    if (contentTitle) {
      setTitle(contentTitle);
    }
    if (contentAuthor) {
      setAuthor(contentAuthor);
    }
  }, [contentTitle, contentAuthor]);

  const dispatch = useDispatch();
  //https://www.codegrepper.com/code-examples/javascript/how+to+get+current+date+in+react+js
  //Current method for pulling current date
  const current = new Date();
  const currentDate = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const handleSubmit = (event: any) => {
    event.preventDefault(); //Prevents page fresh on submit, disable if needed
    let pageJsonData: ExportData = {
      title: "",
      author: "",
      content: [],
      editableContent: {},
    };
    let contentArr: any[] = [];
    pageJsonData.title = JSON.stringify(title, undefined, 2);
    pageJsonData.author = JSON.stringify(author, undefined, 2);
    jsonData.forEach((content: any) => {
      console.log(content);
      contentArr.push(content);
    });
    pageJsonData.content = contentArr;
    // let exportData = pageJsonData.content.join(",\n");

    // create an array from entity map data
    const entityMap = Object.keys(rawData.entityMap).map(
      (key) => rawData.entityMap[key]
    );

    console.log(entityMap);

    dispatch(updateMetadata({ title: title, author: author }));
    dispatch(
      updateContentEditor({
        content: pageJsonData.content,
        editableContent: rawData,
        blocks: rawData.blocks,
        entityMap: entityMap,
      })
    );

    if (contentId) {
      dispatch(requestUpdateContent());
    } else {
      dispatch(requestAddContent());
    }

    console.log(rawData.entityMap);
  };

  return (
    <form className="paper-style">
      <div>
        <label className="label-style">Content Title:</label>
        <input
          className="input-style"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="label-style">Author:</label>
        <input
          className="input-style"
          type="text"
          name="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
      </div>
      <button
        type="button"
        onClick={(e) => {
          handleSubmit(e);
        }}
        className="btn-style"
      >
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
