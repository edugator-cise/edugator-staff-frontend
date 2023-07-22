import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseState {
  courseId: string | undefined;
}

const TESTING_COURSE_ID = "978f5c19-e07d-4999-b88a-f39d2e812080";

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
