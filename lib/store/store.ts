import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "lib/store/rootReducer";
import rootSaga from "lib/store/rootSaga";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware] as const,
});
sagaMiddleware.run(rootSaga);

// intercepts 401 responses from axios and dispatch logout
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
