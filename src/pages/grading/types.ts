import { IFeedback } from "../../shared/types";

export interface IGradeRequest {
  toGrade: File;
  email: string;
  problemID: string;
}

export interface IGradingState {
  uploading: boolean;
  uploadState: IUploadState;
  feedback: IFeedback;
}

export interface IUploadState {
  progress: number;
  display: boolean;
}

export interface IUploadProgress {
  loaded: number;
  total: number;
}
