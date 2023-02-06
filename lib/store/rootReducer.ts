import { combineReducers } from "redux";
import problemEditorContainerReducer from "components/ProblemEditor/problemEditorContainerSlice";
import contentEditorReducer from "../../src/pages/ContentEditor/contentEditorPageSlice";
import { loginSlice } from "components/Login/LoginSlice"
import moduleReducer from "components/Modules/ModulesSlice";
// import gradingReducer from "../../src/pages/grading/GradingDialog.slice";
import accountManagerReducer from "components/Accounts/AdminAccountsPage.slice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  modules: moduleReducer,
  // grading: gradingReducer,
  accountManager: accountManagerReducer,
  problemEditorContainer: problemEditorContainerReducer,
  contentEditorPage: contentEditorReducer,
});

export default rootReducer;
