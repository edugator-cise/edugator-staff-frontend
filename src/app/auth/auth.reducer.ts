import { IGenericAction } from "../common/types";
import { AuthActionTypes } from "./auth.actions";

export interface IAuthState {
    authorizationToken: string,
    isLoading: boolean
}

const initialAuthState: IAuthState = {
    authorizationToken: "",
    isLoading: false
};

/**
 * Gets a safe copy of the initial auth state
 */
export function getInitialAuthState(): IAuthState {
    return {...initialAuthState};
}
  
export default function authReducer(state = getInitialAuthState(), action: IGenericAction): IAuthState {
    switch (action.type) {
        case AuthActionTypes.REQUEST_LOGIN:
            return {
                ...state,
                isLoading: true
            };
        default:
            return {...state};
    }
}