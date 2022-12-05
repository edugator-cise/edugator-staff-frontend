import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILesson } from "../../shared/types";

export interface ContentEditorFields {
  content: Object[];
  editableContent: {
    blocks: Object[];
    entityMap: Array<Object>;
  };
  blocks: Object[];
  entityMap: Array<Object>;
}

interface Block {
  data: Object;
  type: string;
  depth: number;
  entityRanges: Object[];
  inlineStyleRanges: Object[];
  text: string;
  key: string;
}

export interface MetadataFields {
  title: string;
  author: string;
}

export enum WarningTypes {
  Delete = "DELETE",
  Quit = "QUIT",
}

export interface ProblemEditorContainerState {
  metadata: MetadataFields;
  contentEditor: ContentEditorFields;

  contentId: string | undefined;
  moduleId: string;
  moduleName: string | undefined;

  isSubmitting: boolean;
  fetchingContent: boolean;
  showSuccessModal: boolean;
  showFailureModal: boolean;
  showWarningModal: boolean;
  warningType: WarningTypes | undefined;
}

const initialState: ProblemEditorContainerState = {
  metadata: {
    title: "",
    author: "",
  },
  contentEditor: {
    content: [],
    editableContent: {
      blocks: [],
      entityMap: [],
    },
    blocks: [],
    entityMap: [],
  },
  contentId: undefined,
  moduleId: "",
  moduleName: "",
  isSubmitting: false,
  fetchingContent: false,
  showFailureModal: false,
  showSuccessModal: false,
  showWarningModal: false,
  warningType: undefined,
};

export const getProblemEditorInitialState = (): ProblemEditorContainerState => {
  return { ...initialState };
};

export const contentEditorPageSlice = createSlice({
  name: "contentEditorPage",
  initialState,
  reducers: {
    updateMetadata: (state, action: PayloadAction<MetadataFields>) => {
      state.metadata = action.payload;
    },
    updateContentEditor: (
      state,
      action: PayloadAction<ContentEditorFields>
    ) => {
      state.contentEditor = action.payload;
    },
    updateBlocks: (state, action: PayloadAction<Block[]>) => {
      state.contentEditor.editableContent.blocks = action.payload;
    },
    updateEntityMap: (state, action: PayloadAction<Array<Object>>) => {
      state.contentEditor.editableContent.entityMap = action.payload;
    },

    updateContentId: (state, action: PayloadAction<string | undefined>) => {
      state.contentId = action.payload;
    },
    updateModuleId: (state, action: PayloadAction<string>) => {
      state.moduleId = action.payload;
    },
    updateModuleName: (state, action: PayloadAction<string | undefined>) => {
      state.moduleName = action.payload;
    },

    closeFailureModal: (state) => {
      state.showFailureModal = false;
    },

    openWarningModal: (state, action: PayloadAction<WarningTypes>) => {
      state.showWarningModal = true;
      state.warningType = action.payload;
    },
    closeWarningModal: (state) => {
      state.showWarningModal = false;
      state.warningType = undefined;
    },

    resetState: (state) => {
      return getProblemEditorInitialState();
    },

    /* API calls */

    requestAddContent: (state) => {
      state.isSubmitting = true;
    },
    requestAddContentSuccess: (state) => {
      state.isSubmitting = false;
      state.showSuccessModal = true;
    },
    requestAddContentFailure: (state) => {
      state.isSubmitting = false;
      state.showFailureModal = true;
    },

    requestGetContent: (state, action: PayloadAction<string>) => {
      state.fetchingContent = true;
    },
    requestGetContentSuccess: (state, action: PayloadAction<ILesson>) => {
      state.fetchingContent = false;

      state.metadata = {
        title: action.payload.title,
        author: action.payload.author,
      };
      state.contentEditor = {
        content: { ...action.payload.content },
        editableContent: {
          blocks: action.payload.editableContent.blocks,
          entityMap: action.payload.editableContent.entityMap,
        },
        blocks: action.payload.blocks,
        entityMap: action.payload.entityMap,
      };
    },
    requestGetContentFailure: (state, action: PayloadAction<any>) => {
      state.fetchingContent = false;
      alert(action.payload);
    },

    requestUpdateContent: (state) => {
      state.isSubmitting = true;
    },
    requestUpdateContentSuccess: (state) => {
      state.isSubmitting = false;
      state.showSuccessModal = true;
      // TODO some kind of edit confirmation then back to modules
    },
    requestUpdateContentFailure: (state, action: PayloadAction<any>) => {
      state.isSubmitting = false;
      state.showFailureModal = true;
    },

    requestDeleteContent: (state) => {},
    requestDeleteContentSuccess: (state) => {},
    requestDeleteContentFailure: (state, action: PayloadAction<any>) => {
      alert(action.payload);
    },
  },
});

export const {
  updateMetadata,
  updateContentEditor,
  closeFailureModal,
  updateModuleId,
  updateModuleName,
  updateContentId,
  resetState,
  openWarningModal,
  closeWarningModal,
  requestAddContent,
  requestAddContentSuccess,
  requestAddContentFailure,
  requestGetContent,
  requestGetContentSuccess,
  requestGetContentFailure,
  requestUpdateContent,
  requestUpdateContentSuccess,
  requestUpdateContentFailure,
  requestDeleteContent,
  requestDeleteContentSuccess,
  requestDeleteContentFailure,
} = contentEditorPageSlice.actions;
export default contentEditorPageSlice.reducer;
