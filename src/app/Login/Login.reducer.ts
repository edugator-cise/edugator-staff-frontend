import {
  LoginActionTypes,
  IReceiveLoginFailureAction,
  IReceiveLoginSuccessAction,
  IRequestLoginAction,
} from "./Login.actions";

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

export default function loginReducer(
  state = getInitialAuthState(),
  action:
    | IReceiveLoginSuccessAction
    | IReceiveLoginFailureAction
    | IRequestLoginAction
): IAuthState {
  switch (action.type) {
    case LoginActionTypes.REQUEST_LOGIN:
      return {
        ...state,
        isLoading: true,
        authorizationToken: "",
        errorMessage: "",
      };
    case LoginActionTypes.RECEIVE_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authorizationToken: action.token,
        errorMessage: "",
      };
    case LoginActionTypes.RECEIVE_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        authorizationToken: "",
        errorMessage: action.message,
      };
    default:
      return { ...state };
  }
}
