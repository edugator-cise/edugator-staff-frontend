import { useState, useEffect } from "react";
import {
  requestUpdateContentSuccess,
  requestAddContentSuccess,
  updateContentEditor,
  updateMetadata,
} from "../../../state/contentEditorPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import { ILesson, INewLesson } from "lib/shared/types";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import { useRouter } from "next/router";
import { Routes } from "constants/navigationRoutes";
import toast from "react-hot-toast";
import { deepClone } from "utils/CodeEditorUtils";

interface ExportData {
  title: string;
  author: string;
  content: any[];
  editableContent: any;
}

export const RegistrationForm = ({
  jsonData,
  rawData,
  rawLesson,
  moduleId,
}: {
  jsonData: any;
  rawData: any;
  rawLesson?: ILesson;
  moduleId: string;
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const contentId = rawLesson?._id || null;
  console.log(contentId);
  console.log(rawData);

  const router = useRouter();

  const dispatch = useDispatch();

  const contentState = useSelector(
    (state: RootState) => state.contentEditorPage
  );

  const handleUpdateContentRequest = async (postedLesson: ILesson) => {
    console.log("UPDATED");
    console.log(contentState.contentEditor);
    try {
      await apiClient.put(
        apiRoutes.admin.putLesson(contentId as string),
        postedLesson
      );
      toast.success("Content updated successfully");
      dispatch(requestUpdateContentSuccess());
      router.push(Routes.Modules);
    } catch (e) {
      toast.error("Content failed to create");
    }
  };

  const handleAddContentRequest = async (postedLesson: INewLesson) => {
    console.log(contentState.moduleId);
    try {
      await apiClient.post(apiRoutes.admin.createLesson, postedLesson);
      toast.success("Content created successfully");
      dispatch(requestAddContentSuccess());
      router.push(Routes.Modules);
    } catch (e) {
      console.log(e);
      toast.error("Content failed to create");
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault(); //Prevents page fresh on submit, disable if needed
    if (contentId) {
      const postedLesson: ILesson = {
        title: title,
        author: author,
        content: jsonData.map((content: any) => content),
        editableContent: rawData, //maybe deepclone
        blocks: rawData.blocks,
        entityMap: Object.keys(rawData.entityMap).map(
          (key) => rawData.entityMap[key]
        ),
      };
      console.log("UPDATE");
      console.log(postedLesson);

      handleUpdateContentRequest(postedLesson);
    } else {
      const postedLesson: INewLesson = {
        title: title,
        author: author,
        content: jsonData.map((content: any) => content),
        editableContent: rawData, //maybe deepclone
        blocks: rawData.blocks,
        entityMap: Object.keys(rawData.entityMap).map(
          (key) => rawData.entityMap[key]
        ),
        moduleId: moduleId,
      };
      console.log("CREATE");
      console.log(postedLesson);
      handleAddContentRequest(postedLesson);
    }

    /* dispatch(
      updateMetadata({ title: pageJsonData.title, author: pageJsonData.author })
    );
    dispatch(
      updateContentEditor({
        content: pageJsonData.content,
        editableContent: rawData,
        blocks: rawData.blocks,
        entityMap: Object.keys(rawData.entityMap).map(
          (key) => rawData.entityMap[key]
        ),
      })
    ); */
    /* 
    if (contentId) {
      handleUpdateContentRequest(postedLesson);
    } else {
      handleAddContentRequest(postedLesson);
    } */
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
