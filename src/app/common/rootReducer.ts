import { combineReducers } from "redux";
import problemEditorContainerReducer from "../../pages/ProblemEditor/ProblemEditorContainer/problemEditorContainerSlice";
import codeEditorReducer from "../../pages/CodeEditor/CodeEditorSlice";
import contentEditorReducer from "../../pages/ContentEditor/contentEditorPageSlice";
import { loginSlice } from "../../pages/Login/LoginPage.slice";
import moduleReducer from "../../pages/modules/ModulesPage.slice";
import gradingReducer from "../../pages/grading/GradingDialog.slice";
import accountManagerReducer from "../../pages/accounts/AdminAccountsPage.slice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  modules: moduleReducer,
  grading: gradingReducer,
  accountManager: accountManagerReducer,
  problemEditorContainer: problemEditorContainerReducer,
  contentEditorPage: contentEditorReducer,
  // codeEditor: codeEditorReducer,
});

export default rootReducer;
