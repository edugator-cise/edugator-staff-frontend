import { combineReducers } from 'redux';
import authReducer from '../auth/auth.reducer';
/* import slices of state here */

/* Place the object keys for state here followed by the reducer taken from that slice
    e.g. key : keyReducer
*/
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;