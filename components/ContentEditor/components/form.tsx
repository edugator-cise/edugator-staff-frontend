import { useState, useEffect } from "react";
import {
  requestUpdateContentSuccess,
  requestAddContentSuccess,
  updateContentEditor,
  updateMetadata,
} from "../contentEditorPageSlice";
import { useDispatch, useSelector } from "react-redux";
import "./FormStyles.module.css";
import { RootState } from "lib/store/store";
import { ILesson, INewLesson } from "lib/shared/types";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import { useRouter } from "next/router";
import { Routes } from "constants/navigationRoutes";
import toast from "react-hot-toast";

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

  const contentId = useSelector(
    (state: RootState) => state.contentEditorPage.contentId
  );

  const contentTitle = useSelector(
    (state: RootState) => state.contentEditorPage.metadata.title
  );

  const contentAuthor = useSelector(
    (state: RootState) => state.contentEditorPage.metadata.author
  );

  const router = useRouter();

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

  const contentState = useSelector((state: RootState) => state.contentEditorPage);

  const handleUpdateContentRequest = async () => {
    const updatedContent: ILesson = {
      ...contentState.metadata,
      ...contentState.contentEditor,
    }
    try {
      await apiClient.put(apiRoutes.admin.putLesson(contentState.contentId as string), updatedContent);
      toast.success("Content created successfully")
      dispatch(requestUpdateContentSuccess());
      router.push(Routes.Modules);
    } catch(e) {
      toast.error("Content failed to create");
    }
  }

  const handleAddContentRequest = async () => {
    const updatedContent: INewLesson = {
      moduleId: contentState.moduleId,
      ...contentState.metadata,
      ...contentState.contentEditor,
    }
    try {
      await apiClient.post(apiRoutes.admin.createLesson, updatedContent);
      toast.success("Content created successfully")
      dispatch(requestAddContentSuccess());
      router.push(Routes.Modules);
    } catch(e) {
      toast.error("Content failed to create");
    }
  }
  const handleSubmit = (event: any) => {
    event.preventDefault(); //Prevents page fresh on submit, disable if needed
    const pageJsonData: ExportData = {
      title: "",
      author: "",
      content: [],
      editableContent: {},
    };
    const contentArr: any[] = [];
    pageJsonData.title = JSON.stringify(title, undefined, 2);
    pageJsonData.author = JSON.stringify(author, undefined, 2);
    jsonData.forEach((content: any) => {
      console.log(content);
      contentArr.push(content);
    });
    pageJsonData.content = contentArr;

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
      handleUpdateContentRequest() 
    } else {
      handleAddContentRequest()
    }
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
