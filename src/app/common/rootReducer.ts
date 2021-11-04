import { combineReducers } from "redux";
import problemEditorContainerReducer from "../../pages/ProblemEditor/ProblemEditorContainer/problemEditorContainerSlice";
import codeEditorReducer from "../../pages/CodeEditor/CodeEditorSlice";
import { loginSlice } from "../../pages/Login/LoginPage.slice";
import { moduleSlice } from "../../pages/modules/ModulesPage.slice";
import { gradingSlice } from "../../pages/grading/GradingDialog.slice";
import landingPageReducer from "../../pages/LandingPage/LandingPageSlice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  modules: moduleSlice.reducer,
  grading: gradingSlice.reducer,
  problemEditorContainer: problemEditorContainerReducer,
  codeEditor: codeEditorReducer,
  landingPage: landingPageReducer,
});

export default rootReducer;
