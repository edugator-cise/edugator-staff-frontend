export interface IGradeRequest {
  toGrade: File;
  email: string;
  problemID: string;
}

export interface IGradingState {
  uploading: boolean;
  progress: number;
}
