import { combineReducers } from "redux";
import problemEditorContainerReducer from "state/problemEditorContainerSlice";
import contentEditorReducer from "state/contentEditorPageSlice";
import loginReducer from "state/LoginSlice";
import moduleReducer from "state/ModulesSlice";
import accountManagerReducer from "state/AdminAccountsPage.slice";
import interfaceControlsReducer from "state/interfaceControls.slice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginReducer,
  modules: moduleReducer,
  accountManager: accountManagerReducer,
  problemEditorContainer: problemEditorContainerReducer,
  contentEditorPage: contentEditorReducer,
  interfaceControls: interfaceControlsReducer,
});

export default rootReducer;
