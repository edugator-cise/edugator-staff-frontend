import store from "../../../../lib/store/store";
import { rolesEnum } from "../../accounts/types";
import {
  receiveLoginFailure,
  receiveLoginSuccess,
  requestLogin,
} from "../LoginPage.slice";
import { IAuthState, ILoginSuccess } from "../types";

describe("Auth Reducer", () => {
  jest.mock("../../../app/common/apiClient");

  it("should handle request login", () => {
    const baseLoginState = store.getState().login;

    store.dispatch(requestLogin({ username: "test", password: "test" }));

    const expected = {
      ...baseLoginState,
      errorMessage: "",
      isLoading: true,
    };
    expect(store.getState().login).toEqual(expected);
  });

  it("should handle receive login success", () => {
    const baseLoginState = store.getState().login;

    const data: ILoginSuccess = {
      token: "token",
      role: rolesEnum.TA,
    };
    store.dispatch(receiveLoginSuccess(data));

    const expected: IAuthState = {
      ...baseLoginState,
      errorMessage: "",
      isLoading: false,
      loggedIn: true,
      role: rolesEnum.TA,
    };
    expect(store.getState().login).toEqual(expected);
  });

  it("should handle receive login success", () => {
    const baseLoginState = store.getState().login;

    const msg = "test-error";
    store.dispatch(receiveLoginFailure(msg));

    const expected = {
      ...baseLoginState,
      errorMessage: msg,
      isLoading: false,
    };
    expect(store.getState().login).toEqual(expected);
  });
});
