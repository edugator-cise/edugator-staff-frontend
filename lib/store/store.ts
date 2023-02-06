import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "lib/store/rootReducer";
const store = configureStore({
  reducer: rootReducer,
});

// intercepts 401 responses from axios and dispatch logout
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
