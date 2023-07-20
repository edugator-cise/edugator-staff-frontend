import { combineReducers } from "redux";
import contentEditorReducer from "state/contentEditorPageSlice";
import loginReducer from "state/LoginSlice";
import interfaceControlsReducer from "state/interfaceControls.slice";
import courseSlice from "state/courseSlice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginReducer,
  contentEditorPage: contentEditorReducer,
  interfaceControls: interfaceControlsReducer,
  course: courseSlice,
});

export default rootReducer;
