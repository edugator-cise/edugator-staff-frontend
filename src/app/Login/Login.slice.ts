import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  authorizationToken: string;
  isLoading: boolean;
  errorMessage: string;
}

const initialAuthState: IAuthState = {
  authorizationToken: "",
  isLoading: false,
  errorMessage: "",
};

/**
 * Gets a safe copy of the initial auth state
 */
export function getInitialAuthState(): IAuthState {
  return { ...initialAuthState };
}

export interface IRequestLoginAction {
  username: string;
  password: string;
}

//const requestLogin = createAction('requestLogin', withPayloadType<IRequestLoginAction>() );

export const loginSlice = createSlice({
  name: "login",
  initialState: getInitialAuthState(),
  reducers: {
    requestLogin(state, action: PayloadAction<IRequestLoginAction>) {
      state.isLoading = true;
      return state;
    },
    receiveLoginSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        authorizationToken: action.payload,
        errorMessage: "",
      };
    },
    receiveLoginFailure(state, action) {
      return {
        ...state,
        isLoading: false,
        authorizationToken: "",
        errorMessage: action.payload,
      };
    },
    // increment: state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { requestLogin, receiveLoginSuccess, receiveLoginFailure } =
  loginSlice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

export default loginSlice.reducer;
