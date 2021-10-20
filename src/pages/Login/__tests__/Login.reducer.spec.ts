import store from "../../../app/common/store";
import {
  receiveLoginFailure,
  receiveLoginSuccess,
  requestLogin,
} from "../LoginPage.slice";

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

    const token = "token";
    store.dispatch(receiveLoginSuccess(token));

    const expected = {
      ...baseLoginState,
      errorMessage: "",
      isLoading: false,
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
