import { combineReducers } from "redux";
import problemEditorContainerReducer from "../../pages/ProblemEditor/ProblemEditorContainer/problemEditorContainerSlice";
import { loginSlice } from "../../pages/Login/LoginPage.slice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  problemEditorContainer: problemEditorContainerReducer,
});

export default rootReducer;
