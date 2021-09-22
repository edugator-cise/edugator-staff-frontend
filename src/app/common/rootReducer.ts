import { combineReducers } from "redux";
import { loginSlice } from "../Login/Login.slice";
import { moduleSlice } from "../../pages/modules/ModulesPage.slice";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  modules: moduleSlice.reducer,
});

export default rootReducer;
