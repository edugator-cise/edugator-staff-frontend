import { combineReducers } from "redux";
import problemEditorContainerReducer from "components/ProblemEditor/problemEditorContainerSlice";
import contentEditorReducer from "components/ContentEditor/contentEditorPageSlice";
import { loginSlice } from "components/Login/LoginSlice"
import moduleReducer from "components/Modules/ModulesSlice";
import accountManagerReducer from "components/Accounts/AdminAccountsPage.slice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  modules: moduleReducer,
  accountManager: accountManagerReducer,
  problemEditorContainer: problemEditorContainerReducer,
  contentEditorPage: contentEditorReducer,
});

export default rootReducer;
