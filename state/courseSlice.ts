import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseState {
  courseId: string | undefined;
}

export const TESTING_COURSE_ID = "978f5c19-e07d-4999-b88a-f39d2e812080";

export const TESTING_COURSE_ID_2 = "80599186-58e9-4560-b526-77a9e58733aa";

export interface Course {
  id: string;
  courseName: string;
  startDate: string;
  endDate: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
}

// below used for testing, eventually will use endpoint to fetch courses where user is an admin
export const sampleCourses = [
  {
    id: "978f5c19-e07d-4999-b88a-f39d2e812080",
    courseName: "Testing Course",
    startDate: "2023-06-05T05:09:25.000Z",
    endDate: "2023-06-05T05:09:25.000Z",
    logo: "https://m.media-amazon.com/images/I/51KBkyE8upL.png",
    createdAt: "2023-07-02T01:10:11.000Z",
    updatedAt: "2023-07-02T01:10:11.000Z",
    organizationId: "4d964b0f-648a-4d41-bd71-87e575087fc8",
  },
  {
    id: "80599186-58e9-4560-b526-77a9e58733aa",
    courseName: "Multicourse Test",
    startDate: "2023-06-05T05:09:25.000Z",
    endDate: "2023-06-05T05:09:25.000Z",
    logo: "https://images-platform.99static.com//KlBLMX8dQrcq6hZGnxf5HSnG29I=/8x543:525x1060/fit-in/500x500/99designs-contests-attachments/123/123360/attachment_123360235",
    createdAt: "2023-07-20T03:25:18.000Z",
    updatedAt: "2023-07-20T03:25:18.000Z",
    organizationId: "4d964b0f-648a-4d41-bd71-87e575087fc8",
  },
];

const initialState: CourseState = {
  courseId: TESTING_COURSE_ID, // undefined, set to undefined when we add multi-course support
};

export const getCourseInitialState = (): CourseState => {
  return { ...initialState };
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseId: (state, action: PayloadAction<string>) => {
      state.courseId = action.payload;
    },
  },
});

export const { setCourseId } = courseSlice.actions;
export default courseSlice.reducer;
