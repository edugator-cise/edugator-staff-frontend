import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
/* import slices of state here */

export const store = configureStore({
  reducer: {
    /* Place the object keys for state here followed by the reducer taken from that slice

      e.g. key : keyReducer

    */
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
