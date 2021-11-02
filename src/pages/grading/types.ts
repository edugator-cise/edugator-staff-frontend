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

export const GRADING_REQUEST_PROGRESS = "GRADING_REQUEST_PROGRESS";

export interface IProgressUpdate {
  loaded: number;
  total: number;
}
