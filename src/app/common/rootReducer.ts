import { combineReducers } from "redux";
import loginReducer from "../Login/Login.reducer";
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
